const getLink = (id: string, home: string, away: string) => {
  return `https://www.nba.com/game/${away}-vs-${home}-${id}?watch`;
};

export default getLink;
