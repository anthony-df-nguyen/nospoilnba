import axios from "axios";
import { SCOREBOARD, normalizeEvent } from "../../lib/espn";
import { addDays } from "../../data/DateFunctions";

export default async function handler(req, res) {
  const date = String(req.query.date ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: "date must be YYYY-MM-DD" });
  }

  try {
    // ESPN groups games by US schedule day, so a viewer's local day can spill
    // into the neighbouring ones. Return all three and let the client keep the
    // games that fall on its own local date.
    const days = [addDays(date, -1), date, addDays(date, 1)];
    const responses = await Promise.all(
      days.map((day) =>
        axios.get(SCOREBOARD, {
          params: { dates: day.replace(/-/g, "") },
          timeout: 8000,
        })
      )
    );

    const byId = new Map<string, ReturnType<typeof normalizeEvent>>();
    responses.forEach(({ data }) =>
      (data.events ?? []).forEach((event: any) => {
        if (!byId.has(event.id)) byId.set(event.id, normalizeEvent(event));
      })
    );
    const games = Array.from(byId.values()).sort((a, b) =>
      a.gameDateTimeUTC.localeCompare(b.gameDateTimeUTC)
    );

    res.setHeader("Cache-Control", "s-maxage=10, stale-while-revalidate=30");
    res.status(200).json(games);
  } catch (err) {
    console.error("getgames failed:", err?.message);
    res.status(502).json({ error: "Failed to fetch games" });
  }
}
