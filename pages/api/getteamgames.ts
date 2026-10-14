import axios from "axios";
import teams from "../../data/teams";
import { TEAMS_BASE, espnCode, normalizeEvent } from "../../lib/espn";

const SEASON_TYPES = [1, 2, 3]; // preseason, regular season, playoffs
const valid = new Set(teams.map((t) => t.tricode));

// Every game on the schedule of the given teams: ?teams=NYK,LAL
export default async function handler(req, res) {
  const requested = String(req.query.teams ?? "")
    .split(",")
    .map((t) => t.trim().toUpperCase())
    .filter((t) => valid.has(t));
  const tricodes = Array.from(new Set(requested));

  if (tricodes.length === 0) {
    return res.status(400).json({ error: "teams must be a list of tricodes" });
  }

  const results = await Promise.allSettled(
    tricodes.flatMap((tricode) =>
      SEASON_TYPES.map((seasontype) =>
        axios.get(`${TEAMS_BASE}/${espnCode(tricode)}/schedule`, {
          params: { seasontype },
          timeout: 8000,
        })
      )
    )
  );

  const fulfilled = results.filter(
    (r): r is PromiseFulfilledResult<any> => r.status === "fulfilled"
  );
  if (fulfilled.length === 0) {
    return res.status(502).json({ error: "Failed to fetch schedules" });
  }

  const byId = new Map<string, ReturnType<typeof normalizeEvent>>();
  fulfilled.forEach((r) =>
    (r.value.data.events ?? []).forEach((event: any) => {
      if (!byId.has(event.id)) byId.set(event.id, normalizeEvent(event));
    })
  );
  const games = Array.from(byId.values()).sort((a, b) =>
    a.gameDateTimeUTC.localeCompare(b.gameDateTimeUTC)
  );

  res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
  res.status(200).json(games);
}
