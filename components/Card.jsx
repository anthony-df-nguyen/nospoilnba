import React, { useState } from "react";
import Button from "../components/Button";

const Card = (props) => {
  const [showScore, updateShowScore] = useState("none");
  const [showButtonText,updateButtonText] =useState("Show Scores")

  const toggleScore = () => {
    switch (showScore) {
      case "none":
        updateShowScore("block");
        updateButtonText("Hide Scores")
        break;
      case "block":
        updateShowScore("none");
        updateButtonText("Show Scores")
        break;
      default:
        updateShowScore("block");
        updateButtonText("Hide Scores")
        break;
    }
  };
  
  return (
    <div className="gameDiv">
      <div className="status">{props.gameStatus}</div>
      <div className="time">{props.gameTime}</div>
      <div className="scoreGrid" >
        <div className="score" style={{ display: showScore }}>{props.homeScore}</div>
        <div className="score" style={{ display: showScore }}>{props.awayScore}</div>
      </div>
      <div className="subGrid">
        <div>
          <img className="teamLogo" src={props.homeLogoSource} alt="" />
          <div className="cityName">{props.homeCity}</div>
          {props.homeTeam}
          <div className="homeAway">Home</div>
        </div>
        <div>
          <img className="teamLogo" src={props.awayLogoSource} alt="" />
          <div className="cityName">{props.awayCity}</div>
          {props.awayTeam}
          <div className="homeAway">Away</div>
        </div>
      </div>
      <Button text={showButtonText} function={toggleScore}></Button>
      <div style={{ display: "inline", marginLeft: "1rem" }}>
        <a href={props.link} target="_blank" rel="noreferrer"><Button text="Watch Game"></Button></a>
      </div>
    </div>
  );
};

export default Card;
