export default async function handler(req, res) {
    let theData;
    const response = await fetch("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_1.json").then((r) => r.json()).then(data => {
        theData = data
    })
  res.status(200).json(theData)
}