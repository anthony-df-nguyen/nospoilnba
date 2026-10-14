import moment from "moment";

export const DATE_FORMAT = "YYYY-MM-DD";

export const todayKey = () => moment().format(DATE_FORMAT);

export const addDays = (key: string, days: number) =>
  moment(key, DATE_FORMAT).add(days, "days").format(DATE_FORMAT);

export const longLabel = (key: string) =>
  moment(key, DATE_FORMAT).format("dddd, MMMM D");

// "Today", "Tomorrow", "Yesterday", otherwise "Sat, Oct 17"
export const groupLabel = (key: string) => {
  const diff = moment(key, DATE_FORMAT).diff(moment(todayKey(), DATE_FORMAT), "days");
  const day = moment(key, DATE_FORMAT).format("ddd, MMM D");
  if (diff === 0) return `Today · ${day}`;
  if (diff === 1) return `Tomorrow · ${day}`;
  if (diff === -1) return `Yesterday · ${day}`;
  return day;
};

// The viewer's local calendar day a game starts on
export const localDayOf = (utc: string) => moment(utc).format(DATE_FORMAT);

// ESPN lists games under the US schedule day. Games on that day tip off roughly
// 17:00Z to 03:00Z the next day, so map both ends to the viewer's local days.
export const localDaysForScheduleDay = (key: string) => [
  moment.utc(`${key}T17:00`).local().format(DATE_FORMAT),
  moment.utc(`${key}T03:00`).add(1, "days").local().format(DATE_FORMAT),
];
