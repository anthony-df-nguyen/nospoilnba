import React, { useState, useEffect } from "react";
import NBALogo from "../components/NbaLogo";
import Loading from "../components/Loading";
import DatePicker from "react-datepicker";
import {
  parseDate,
  goToToday,
  jump1day,
  convertPickerDate,
} from "../data/DateFunctions";
import "react-datepicker/dist/react-datepicker.css";
import ButtonGroup from "../components/ButtonGroup";
import GetData from "../components/GetData";
import moment from "moment";

function App() {
  const [date, updateDate] = useState<string>(
    moment(new Date()).format("yyyy-MM-DD")
  );

  const [showLoading, updateLoading] = useState(true);
  const [showGameText, updateShowGameText] = useState("none");

  useEffect(() => {
     if (!sessionStorage.getItem("lastSetDay")) {
       updateDate(moment(new Date()).format("yyyy-MM-DD"));
     } else {
       updateDate(sessionStorage.getItem("lastSetDay"));
     }
  }, []);

  return (
    <div>
      {/* Logo */}
      <div className="container">
        <div className="mt-16 text-center">
          <div className="block mx-auto w-[min-content]">
            <NBALogo />
          </div>
          <div className="text-3xl font-light">No-Spoiler Schedule</div>
        </div>
      </div>

      <div className="container text-center mt-8">Select a date</div>
      {/* Date Picker */}
      <div className="container mx-auto mt-2 block ">
        <DatePicker
          selected={new Date(parseDate(date, "short"))}
          onChange={(e: string) => updateDate(convertPickerDate(e))}
        />
      </div>

      {/* Button Group */}
      <div className="mx-auto mt-1 block max-w-[200px] overflow-hidden">
        <ButtonGroup
          handlers={[
            () => updateDate(jump1day(date, "back")),
            () => updateDate(goToToday()),
            () => updateDate(jump1day(date, "forward")),
          ]}
        />
      </div>

      {showLoading && (
        <div className="container">
          <Loading />
        </div>
      )}
      <div style={{ display: showGameText }}>
        <div className="text-center mt-4">
          <span>Games on {date && parseDate(date, "long")}</span>
        </div>
        <div className="container mt-6 mb-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <GetData
              date={date}
              updateLoading={updateLoading}
              updateGameText={updateShowGameText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
