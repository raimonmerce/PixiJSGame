import type { ScoreEntry, TimeRange } from "../../types";

export default class LeaderboardService {
  private static baseUrl = 'https://your.api/leaderboard'; // Replace with actual endpoint

  static async getTopScores(limit: number = 10): Promise<ScoreEntry[]> {
    const response = await fetch(`${this.baseUrl}/top?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch top scores');
    return response.json();
  }

  static async getLastScores(limit: number = 10): Promise<ScoreEntry[]> {
    const response = await fetch(`${this.baseUrl}/recent?limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch recent scores');
    return response.json();
  }

  static async getTopScoresByRange(range: TimeRange, limit: number = 10): Promise<ScoreEntry[]> {
    const response = await fetch(`${this.baseUrl}/range/${range}?limit=${limit}`);
    if (!response.ok) throw new Error(`Failed to fetch ${range} top scores`);
    return response.json();
  }

  static async addScore(username: string, score: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        score,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to add score: ${errorText}`);
    }
  }
}
