import { useEffect, useState } from "react";
import type { LeaderBoardProps, ScoreEntry } from "../types";
import Leaderboard from "../game/leaderboard/Leaderboard";

const LeaderBoard: React.FC<LeaderBoardProps> = ({ setScreen }) => {
  const [topScores, setTopScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const scores = await Leaderboard.getTopScores();
        setTopScores(scores);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="main-menu">
      <h2>LeaderBoard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ol className="leaderList">
          {topScores.map((entry, index) => (
            <li key={index}>
              {entry.username}: {entry.score}
            </li>
          ))}
        </ol>
      )}

      <button onClick={() => setScreen("menu")}>Back</button>
    </div>
  );
};

export default LeaderBoard;
