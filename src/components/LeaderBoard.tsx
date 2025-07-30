import type { LeaderBoardProps } from "../types";

const LeaderBoard: React.FC<LeaderBoardProps> = ({ setScreen, score }) => {
  return (
    <div className="main-menu">
      <h2>LeaderBoard</h2>
      <h3> Your Scrore {score}</h3>
      <button onClick={() => setScreen('menu')}>Back</button>
    </div>
  );
};

export default LeaderBoard