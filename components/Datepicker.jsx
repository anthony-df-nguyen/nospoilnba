import React,{useState} from "react";


const Datepicker = (props) => {
    const [displayDate,updateDisplay] = useState()

    const updateDate = (e) => {
        let date = `${e.target.value}`
        sessionStorage.setItem("lastSetDay",date);
        updateDisplay(date);
        props.updateDate(date);
    }

    return (<div>
       
       <label htmlFor="date">Choose Date (Local Time):</label>
        <input name="date" type="date"  valueasdate={displayDate}  onChange={updateDate}></input>
    </div>)
}
export default Datepicker