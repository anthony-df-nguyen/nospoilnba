import React, { useState } from "react";
import NBALogo from "../components/nbaLogo";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import {
  parseDate,
  goToToday,
  jump1day,
  convertPickerDate,
} from "../data/DateFunctions";
import "react-datepicker/dist/react-datepicker.css";
import GetData from "../components/GetData";
import Button from "../components/Button";
import moment from "moment";

function App() {
  const [date, updateDate] = useState(() => {
    if (typeof window !== 'undefined') {
      if (!sessionStorage.getItem("lastSetDay")) {
            return moment(new Date()).format("yyyy-MM-DD");
          } else {
            return sessionStorage.getItem("lastSetDay");
          }
    } else {
      return moment(new Date()).format("yyyy-MM-DD")
    }
   
  });

  const [showLoading,updateLoading] = useState("block")
  const [showGameText,updateShowGameText] = useState("none")

  return (
    <div>
      <div id="header">
        <NBALogo />
        No-Spoiler Schedule
      </div>

      <div id="datePicker">
        <p style={{ display: "block", fontWeight: "400", marginRight: "10px" }}>
          Pick a Day:
        </p>
        <DatePicker
          selected={new Date(parseDate(date, "short"))}
          onChange={(e) => updateDate(convertPickerDate(e))}
        />
      </div>
      <div className="timeButtons">
        <Button
          text="&lt; Previous Day"
          function={() => updateDate(jump1day(date, "back"))}
        />
        <Button text="Today" function={() => updateDate(goToToday())} />
        <Button
          text="Next Day &gt;"
          function={() => updateDate(jump1day(date, "forward"))}
        />
      </div>
      <div id="loading" style={{display: showLoading,}}>
      <Loading />
      </div>
      <div style={{display: showGameText}}>
      <div id="gamesOn" style={{ textAlign: "center" }}>
        {/* Games on <span>{parseDate(date, "long")}</span> */}
      </div>
      <div id="gameContainer">
        <div className="gameGridFlex">
          <GetData date={date} updateLoading={updateLoading} updateGameText={updateShowGameText}/>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;

