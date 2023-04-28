import React, { useState } from "react";
import Image from "next/image";
import { TvIcon, ChartBarSquareIcon } from "@heroicons/react/20/solid";

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

  const gameDetail = [
    {
      score: homeScore,
      city: homeCity,
      team: homeTeam,
      logo: homeLogoSource,
      home: true,
    },
    {
      score: awayScore,
      city: awayCity,
      team: awayTeam,
      logo: awayLogoSource,
      home: false,
    },
  ];

  const gameStatusColor = () => {
    switch (gameStatus) {
      case "Final":
        return "bg-green-100 text-green-800";
        break;
      case "PPD":
        return "bg-red-100 text-red-800";
        break;
      default:
        return "bg-gray-100 text-gray-800";
        break;
    }
  };

  return (
    <div className=" rounded-lg bg-white shadow relative min-w-[90%] md:min-w-[400px]">
      <ul role="list" className="">
        <li>
          {/* Status and Time */}
          <div className="text-center mt-6">
            <div
              className={
                "inline-block flex-shrink-0 rounded-full px-4 py-0.5  text-sm font-medium " +
                gameStatusColor()
              }>
              {gameStatus}
            </div>
            <div className="font-light text-2xl mt-4">{gameTime}</div>
          </div>

          {/* Two Teams */}
          <div className="mt-4 grid grid-cols-2 text-center mx-4">
            {gameDetail.map((row) => (
              <div key={row.team}>
                <div className="mx-auto block relative w-16 h-16">
                  <Image
                    className="object-contain"
                    src={row.logo}
                    fill
                    sizes="200px"
                    alt=""
                  />
                </div>
                <div className="mt-4 font-light">{row.city}</div>
                <div className="font-bold">{row.team}</div>
                <div className="font-thin text-sm">
                  {row.home ? "Home" : "Away"}
                </div>
              </div>
            ))}
          </div>

          {/* Scores */}
          <div className="grid grid-cols-2 text-center ">
            {gameDetail.map((row) => (
              <div
                className="mt-8 text-2xl"
                key={row.team + row.score}
                style={{ display: showScore }}>
                {row.score}
              </div>
            ))}
          </div>
        </li>
      </ul>
      {/* Buttons */}
      <div className="my-4 relative">
        <div className="-mt-px flex">
          {/* Show Score */}
          <div
            className="flex w-0 flex-1 hover:cursor-pointer"
            onClick={() => toggleScore()}>
            <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold ">
              <ChartBarSquareIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Show Scores
            </div>
          </div>
          {/* Watch Game */}
          <div className="-ml-px flex w-0 flex-1 hover:cursor-pointer">
            <a
              href={link}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold ">
              <TvIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              Watch Game
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
