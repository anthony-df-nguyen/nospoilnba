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

  useEffect(() => {
    if (array.length === 0) {
      fetchData();
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
          return (
            <Card
              key={i}
              gameStatus={gameStatus(row.gameStatus, row.gameStatusText)}
              gameTime={moment(row.gameDateTimeUTC).format("LT")}
              homeTeam={row.homeTeam.teamName}
              awayTeam={row.awayTeam.teamName}
              homeCity={row.homeTeam.teamCity}
              awayCity={row.awayTeam.teamCity}
              homeScore={row.homeTeam.score}
              awayScore={row.awayTeam.score}
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
