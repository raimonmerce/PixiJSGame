import type { GameOverProps } from "../types";

const GameOver: React.FC<GameOverProps> = ({ setScreen, score }) => {
  return (
    <div className="credits-list">
      <h2>Game Over</h2>
      <h3>Your Score is {score}</h3>
      <button onClick={() => setScreen('game')}>Restart</button>
      <button onClick={() => setScreen('menu')}>Back to Menu</button>
      <button onClick={() => setScreen('leaderboard')}>LeaderBoard</button>
    </div>
  );
};

export default GameOver;