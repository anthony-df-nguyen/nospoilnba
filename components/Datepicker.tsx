import React, { useState } from "react";

const Datepicker = ({ updateDate }) => {
  const [displayDate, updateDisplay] = useState("");

  const handleDate = (e) => {
    let date = `${e.target.value}`;
    sessionStorage.setItem("lastSetDay", date);
    updateDisplay(date);
    updateDate(date);
  };

  return (
    <div>
      <label htmlFor="date">Choose Date (Local Time):</label>
      <input
        name="date"
        type="date"
        //valueasdate={displayDate}
        onChange={handleDate}></input>
    </div>
  );
};
export default Datepicker;
