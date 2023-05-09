import React, { useState, useEffect } from "react";
import Card from "./Card";
import FilterGames from "../data/FilterGames";
import moment from "moment";
import checkLogo from "../data/CheckLogo";
import gameStatus from "../data/GameStatus";
import getLink from "../data/GetLink";
import axios from "axios";

const GetData = ({ date, updateLoading, updateGameText }) => {
  const [fullArray, updateFullArray] = useState<any[]>([]);
  const [array, updateArray] = useState<any[]>([]);
  const [liveArray, updateLiveArray] = useState<any[]>([]);

  //Fetch All Games
  const fetchData = async () => {
    await axios
      .get("/api/getgames")
      .then((res) => {
        const data = res.data;
        updateFullArray(data);
        let shorterArray = FilterGames(data, date);
        updateArray(shorterArray);
      })
      .then(() => updateLoading(false))
      .then(() => updateGameText("block"));
  };

  //Fetch Only Today/Live Stats
  const fetchLive = async () => {
    await axios
      .get("/api/getlivestats")
      .then((res) => updateLiveArray(res.data));
  };

  //Looks through the live array received to get most recent score
  const matchLiveStats = (id: string, backupHomeScore: number, backupAwayScore: number, backupStatusText: string) => {
    const match = liveArray.filter((game) => game.gameId === id)[0];

    //If there is live data found, fallback to the slightly older/slower syncing stats from the fetchData API
    const homeScore = match ? match.homeTeam.score : backupHomeScore;
    const awayScore = match ? match.awayTeam.score : backupAwayScore;
    const gameText = match ? match.gameStatusText : backupStatusText;
    return {
      gameStatusText: gameText,
      homeScore: homeScore,
      awayScore: awayScore,
    };
  };


  useEffect(() => {
    if (array.length === 0) {
      fetchData();
      fetchLive();
      //Setting Refresh Timer
      setInterval(fetchLive, 15000);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (fullArray.length > 0) {
      let shorterArray = FilterGames(fullArray, date);
      updateArray(shorterArray);
    }
    // eslint-disable-next-line
  }, [date]);

  const noGames = () =>
    array.length === 0 && (
      <h2 style={{ textAlign: "center" }}>No games on this day</h2>
    );

  return (
    <>
      {noGames()}
      {array.length > 0 &&
        array.map((row, i) => {
          const gameObject = matchLiveStats(
            row.gameId,
            row.homeTeam.score,
            row.awayTeam.score,
            row.gameStatusText
          );
          return (
            <Card
              key={i}
              gameStatus={gameStatus(row.gameStatus, gameObject.gameStatusText)}
              gameTime={moment(row.gameDateTimeUTC).format("LT")}
              homeTeam={row.homeTeam.teamName}
              awayTeam={row.awayTeam.teamName}
              homeCity={row.homeTeam.teamCity}
              awayCity={row.awayTeam.teamCity}
              homeScore={gameObject.homeScore}
              awayScore={gameObject.awayScore}
              homeLogoSource={checkLogo(row.homeTeam.teamTricode)}
              awayLogoSource={checkLogo(row.awayTeam.teamTricode)}
              link={getLink(
                row.gameId,
                row.homeTeam.teamTricode,
                row.awayTeam.teamTricode
              )}></Card>
          );
        })}
    </>
  );
};

export default GetData;
