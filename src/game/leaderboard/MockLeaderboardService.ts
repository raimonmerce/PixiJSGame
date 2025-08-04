import type { ScoreEntry, TimeRange } from "../../types";

class MockLeaderboardService {
  private scores: ScoreEntry[] = [
    { username: "Alice", score: 1500, timestamp: "2025-08-04T09:00:00Z" },
    { username: "Bob", score: 1200, timestamp: "2025-08-03T14:20:00Z" },
    { username: "Carol", score: 1800, timestamp: "2025-08-02T10:10:00Z" },
    { username: "Dave", score: 800, timestamp: "2025-08-04T08:30:00Z" },
    { username: "Eve", score: 2000, timestamp: "2025-08-01T12:00:00Z" },
    { username: "Frank", score: 1300, timestamp: "2025-07-30T16:45:00Z" },
    { username: "Grace", score: 900, timestamp: "2025-08-04T07:15:00Z" },
    { username: "Heidi", score: 1700, timestamp: "2025-08-03T11:00:00Z" },
    { username: "Ivan", score: 1100, timestamp: "2025-08-04T10:00:00Z" },
    { username: "Judy", score: 1600, timestamp: "2025-07-28T13:30:00Z" },
    { username: "Mallory", score: 1400, timestamp: "2025-08-04T11:20:00Z" },
  ];

  private constructor() {}

  private static _instance: MockLeaderboardService;

  public static get instance(): MockLeaderboardService {
    if (!this._instance) {
      this._instance = new MockLeaderboardService();
    }
    return this._instance;
  }

  public async getTopScores(limit: number = 10): Promise<ScoreEntry[]> {
    return [...this.scores]
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  public async getLastScores(limit: number = 10): Promise<ScoreEntry[]> {
    return [...this.scores]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  public async getTopScoresByRange(range: TimeRange, limit: number = 10): Promise<ScoreEntry[]> {
    const now = new Date();
    let start: Date;

    switch (range) {
      case "day":
        start = new Date(now);
        start.setHours(0, 0, 0, 0);
        break;
      case "week":
        start = new Date(now);
        start.setDate(now.getDate() - 7);
        break;
      case "month":
        start = new Date(now);
        start.setMonth(now.getMonth() - 1);
        break;
      case "year":
        start = new Date(now);
        start.setFullYear(now.getFullYear() - 1);
        break;
      case "forever":
      default:
        start = new Date(0);
        break;
    }

    return this.scores
      .filter(entry => new Date(entry.timestamp) >= start)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  public async addScore(username: string, score: number): Promise<void> {
    const newEntry: ScoreEntry = {
      username,
      score,
      timestamp: new Date().toISOString(),
    };
    this.scores.push(newEntry);
  }
}

export default MockLeaderboardService.instance;
