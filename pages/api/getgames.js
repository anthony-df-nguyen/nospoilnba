import axios from "axios";

const endpoint =
  "https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json";

export default async function handler(req, res) {
  await axios
    .get(endpoint)
    .then(response => response.data)
    .then(data => {
      console.log(typeof data.leagueSchedule.gameDates)
      //console.log(data.leagueSchedule.gameDates);
      res.status(200).json(data.leagueSchedule.gameDates);
    })
}
