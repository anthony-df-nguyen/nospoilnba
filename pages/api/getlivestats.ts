import axios from "axios";

const endpoint: string =
  "https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json";

export default async function handler(req, res) {
  await axios
    .get(endpoint)
    .then((response) => response.data)
    .then((data) => {
      res.status(200).json(data.scoreboard.games);
    });
}
