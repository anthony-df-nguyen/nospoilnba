import axios from "axios";
import { SCOREBOARD } from "../../lib/espn";

// Days (YYYY-MM-DD) on which the current season has games
export default async function handler(req, res) {
  try {
    const { data } = await axios.get(SCOREBOARD, { timeout: 8000 });
    const calendar: string[] = data.leagues?.[0]?.calendar ?? [];
    const days = calendar
      .map((d) => (typeof d === "string" ? d.slice(0, 10) : ""))
      .filter(Boolean);

    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json(days);
  } catch (err) {
    console.error("getcalendar failed:", err?.message);
    res.status(502).json({ error: "Failed to fetch calendar" });
  }
}
