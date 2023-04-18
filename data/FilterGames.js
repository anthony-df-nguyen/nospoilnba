import moment from "moment";

const FilterGames = (array, receivedDate) => {
  console.log("Array: ", array);
  console.log("~ FilterGames ~ receivedDate", receivedDate);
  let day = receivedDate.slice(-2);
  let month = receivedDate.slice(5, 7);
  let year = receivedDate.slice(0, 4);
  let parsed = moment(new Date(`${month}/${day}/${year}`)).format("L");
  let searchDate = `${parsed}`;
  console.log("searchDate: ", searchDate);

  let todaysGames = [];
  try {
    let searchforMatches = array.filter((row) =>
      row.gameDate.match(searchDate)
    );
    searchforMatches[0].games.forEach((row) => {
      todaysGames.push(row);
    });
    return todaysGames;
  } catch (err) {
    return [];
  }
};

export default FilterGames;
