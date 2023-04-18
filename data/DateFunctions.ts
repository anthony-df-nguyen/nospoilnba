import moment from "moment";
function parseDate(date: string, mode: string) {
  let day = date.slice(-2);
  let month = date.slice(5, 7);
  let year = date.slice(0, 4);
  switch (mode) {
    case "short":
      return moment(new Date(`${month}/${day}/${year}`)).format("l");
    case "long":
      return moment(new Date(`${month}/${day}/${year}`)).format("dddd | LL");
    default:
      return moment(new Date(`${month}/${day}/${year}`)).format("l");
  }
}

const goToToday = () => {
  const today = moment(new Date()).format("yyyy-MM-DD");
  sessionStorage.setItem("lastSetDay", today);
  return today;
};

const jump1day = (date: string, mode: string) => {
  let parsed = parseDate(date, "short");
  let newDay;
  if (mode === "back") {
    newDay = moment(new Date(parsed)).subtract(1, "days").format("yyyy-MM-DD");
  } else if (mode === "forward") {
    newDay = moment(new Date(parsed)).add(1, "days").format("yyyy-MM-DD");
  }
  sessionStorage.setItem("lastSetDay", newDay);
  return newDay;
};

const convertPickerDate = (date: string) => {
  const theDate = moment(new Date(date)).format("L");
  const day = theDate.slice(3, 5);
  const month = theDate.slice(0, 2);
  const year = theDate.slice(-4);
  const useDate = `${year}-${month}-${day}`;
  sessionStorage.setItem("lastSetDay", useDate);
  return useDate;
};

export { parseDate, goToToday, jump1day, convertPickerDate };
