import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import FilterGames from "../data/FilterGames.js";
import moment from "moment";
import checkLogo from "../data/CheckLogo";
import gameStatus from "../data/GameStatus";
import getLink from "../data/GetLink"

const GetData = (props) => {
  const [fullArray,updateFullAray] = useState([])
  const [array, updateArray] = useState([]);
  //console.log("🚀 ~ file: GetData.jsx ~ line 9 ~ GetData ~ array", array)

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/getgames")
        .then((a) => a.json())
        .then((b) => b.leagueSchedule.gameDates)
        .then((c) => {
            updateFullAray(c);
            let shorterArray = FilterGames(c, props.date);
            updateArray(shorterArray);
        })
        .then(()=> props.updateLoading('none'))
        .then(() => props.updateGameText("block"))
    };
    if (array.length === 0) {
      fetchData();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
      if (fullArray.length > 0) {
        let shorterArray = FilterGames(fullArray, props.date);
        updateArray(shorterArray);
      }
      // eslint-disable-next-line
  }, [props.date]);

  const noGames = () => array.length === 0 && <h2 style={{textAlign:'center'}}>No games on this day</h2>

  return (
    <>
      {noGames()}
      {array.map((row, i) => {
        //console.log(row)
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
            link={getLink(row.gameId,row.homeTeam.teamTricode,row.awayTeam.teamTricode)}
            >
            </Card>
        );
      })}
    </>
  );
};

export default GetData;
