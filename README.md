# NoSpoil NBA Schedule

A free, mobile-first NBA schedule that hides game scores by default, built for fans who are tired of getting spoiled when searching up their teams online.

**Live app:** [nospoilnba.vercel.app](https://nospoilnba.vercel.app)

## The Problem

I watch NBA games on League Pass hours or days after they air since I can't always watch the game live, but every time I looked up a game time or a schedule, the score shows up in the results and spoils the game for me. Almost every major schedule app and site leads with scores.

## This Project

A schedule where **scores are hidden until you choose to reveal them**, with just enough navigation to find the game you want to watch.

### Features

| Feature | Description |
|---|---|
| **Scores hidden by default** | The core job: look up a game without being spoiled |
| **Per-game reveal** | Reveal only the game you just finished watching |
| **Global "reveal all" toggle** | An opt-out for when spoilers no longer matter |
| **Follow your teams** | Skip the full league slate and see only upcoming and recent games for the teams you care about |
| **Date strip and calendar sheet** | Jump to any day or month quickly on a phone |
| **Times in your local time zone** | Tip-off times are converted automatically, with a note showing which zone is used |

## How It Works

The app is built with Next.js and React and deployed on Vercel. It uses small server-side API routes to fetch schedule data from ESPN's public scoreboard and team schedule endpoints and normalize it into a single game format. The client then decides what to display, so scores never appear on screen until the user reveals them.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Hosting:** Vercel
- **Data (ESPN public API, no key required):**
  - Scoreboard endpoint (`site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard`) for each day's games and the season calendar
  - Team schedule endpoint (`site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/{team}/schedule`) for the followed-teams view

## Running Locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).
