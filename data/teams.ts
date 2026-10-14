export interface Team {
  tricode: string;
  city: string;
  name: string;
}

const teams: Team[] = [
  { tricode: "ATL", city: "Atlanta", name: "Hawks" },
  { tricode: "BKN", city: "Brooklyn", name: "Nets" },
  { tricode: "BOS", city: "Boston", name: "Celtics" },
  { tricode: "CHA", city: "Charlotte", name: "Hornets" },
  { tricode: "CHI", city: "Chicago", name: "Bulls" },
  { tricode: "CLE", city: "Cleveland", name: "Cavaliers" },
  { tricode: "DAL", city: "Dallas", name: "Mavericks" },
  { tricode: "DEN", city: "Denver", name: "Nuggets" },
  { tricode: "DET", city: "Detroit", name: "Pistons" },
  { tricode: "GSW", city: "Golden State", name: "Warriors" },
  { tricode: "HOU", city: "Houston", name: "Rockets" },
  { tricode: "IND", city: "Indiana", name: "Pacers" },
  { tricode: "LAC", city: "LA", name: "Clippers" },
  { tricode: "LAL", city: "Los Angeles", name: "Lakers" },
  { tricode: "MEM", city: "Memphis", name: "Grizzlies" },
  { tricode: "MIA", city: "Miami", name: "Heat" },
  { tricode: "MIL", city: "Milwaukee", name: "Bucks" },
  { tricode: "MIN", city: "Minnesota", name: "Timberwolves" },
  { tricode: "NOP", city: "New Orleans", name: "Pelicans" },
  { tricode: "NYK", city: "New York", name: "Knicks" },
  { tricode: "OKC", city: "Oklahoma City", name: "Thunder" },
  { tricode: "ORL", city: "Orlando", name: "Magic" },
  { tricode: "PHI", city: "Philadelphia", name: "76ers" },
  { tricode: "PHX", city: "Phoenix", name: "Suns" },
  { tricode: "POR", city: "Portland", name: "Trail Blazers" },
  { tricode: "SAC", city: "Sacramento", name: "Kings" },
  { tricode: "SAS", city: "San Antonio", name: "Spurs" },
  { tricode: "TOR", city: "Toronto", name: "Raptors" },
  { tricode: "UTA", city: "Utah", name: "Jazz" },
  { tricode: "WAS", city: "Washington", name: "Wizards" },
];

export const teamByTricode = (tricode: string) =>
  teams.find((t) => t.tricode === tricode);

export default teams;
