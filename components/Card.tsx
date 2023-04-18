import React, { useState } from "react";
import Button from "./Button";
import Image from "next/image";

interface PropTypes {
  gameStatus: string;
  gameTime: string;
  homeScore: number;
  awayScore: number;
  homeLogoSource: string;
  homeCity: string;
  homeTeam: string;
  awayLogoSource: string;
  awayCity: string;
  awayTeam: string;
  link: string;
}

const Card = ({
  gameStatus,
  gameTime,
  homeScore,
  awayScore,
  homeLogoSource,
  homeCity,
  homeTeam,
  awayLogoSource,
  awayCity,
  awayTeam,
  link,
}: PropTypes) => {
  const [showScore, updateShowScore] = useState("none");
  const [showButtonText, updateButtonText] = useState("Show Scores");

  const toggleScore = () => {
    switch (showScore) {
      case "none":
        updateShowScore("block");
        updateButtonText("Hide Scores");
        break;
      case "block":
        updateShowScore("none");
        updateButtonText("Show Scores");
        break;
      default:
        updateShowScore("block");
        updateButtonText("Hide Scores");
        break;
    }
  };

  return (
    <div className="gameDiv">
      <div className="status">{gameStatus}</div>
      <div className="time">{gameTime}</div>
      <div className="scoreGrid">
        <div className="score" style={{ display: showScore }}>
          {homeScore}
        </div>
        <div className="score" style={{ display: showScore }}>
          {awayScore}
        </div>
      </div>
      <div className="subGrid">
        <div>
          <div className="teamLogo">
            <Image src={homeLogoSource} fill sizes="200px" alt="" />
          </div>
          <div className="cityName">{homeCity}</div>
          {homeTeam}
          <div className="homeAway">Home</div>
        </div>
        <div>
          <div className="teamLogo">
            <Image src={awayLogoSource} fill sizes="200px" alt="" />
          </div>

          <div className="cityName">{awayCity}</div>
          {awayTeam}
          <div className="homeAway">Away</div>
        </div>
      </div>
      <Button text={showButtonText} handler={toggleScore}></Button>
      <div style={{ display: "inline", marginLeft: "1rem" }}>
        <a href={link} target="_blank" rel="noreferrer">
          <Button text="Watch Game"></Button>
        </a>
      </div>
    </div>
  );
};

export default Card;
