// Leaderboard.ts
import RealLeaderboardService from "./LeaderboardService";
import MockLeaderboardService from "./MockLeaderboardService";
import type { ScoreEntry, TimeRange } from "../../types";

// Set this to false to use the mock version
const USE_API = false; //Set to false if not API, true if API

const Service = USE_API ? RealLeaderboardService : MockLeaderboardService;

export default class Leaderboard {
  static getTopScores(limit: number = 10): Promise<ScoreEntry[]> {
    return Service.getTopScores(limit);
  }

  static getLastScores(limit: number = 10): Promise<ScoreEntry[]> {
    return Service.getLastScores(limit);
  }

  static getTopScoresByRange(range: TimeRange, limit: number = 10): Promise<ScoreEntry[]> {
    return Service.getTopScoresByRange(range, limit);
  }

  static addScore(username: string, score: number): Promise<void> {
    return Service.addScore(username, score);
  }
}
