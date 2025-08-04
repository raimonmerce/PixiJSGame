import { useState } from "react";
import type { GameOverProps } from "../types";
import Leaderboard from "../game/leaderboard/Leaderboard";

const GameOver: React.FC<GameOverProps> = ({ setScreen, score }) => {
  const [initials, setInitials] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 3);
    setInitials(value);
  };

  const handleGoToLeaderboard = async () => {
    if (initials.length === 3) {
      await Leaderboard.addScore(initials, score);
      setScreen("leaderboard");
    }
  };

  return (
    <div className="credits-list">
      <h2>Game Over</h2>
      <h3>Your Score is {score}</h3>
      <div className="initials-wrapper">
        <label className="initials-label">Enter Initials:</label>
        <input
          type="text"
          value={initials}
          onChange={handleInputChange}
          maxLength={3}
          className="initials-input"
          placeholder="AAA"
        />
      </div>
      <button
        onClick={handleGoToLeaderboard}
        disabled={initials.length !== 3}
      >
        Submit
      </button>
      <button onClick={() => setScreen("game")}>Restart</button>
      <button onClick={() => setScreen("menu")}>Back to Menu</button>
    </div>
  );
};

export default GameOver;
