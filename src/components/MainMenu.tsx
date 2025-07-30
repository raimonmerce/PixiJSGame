import type { MainMenuProps } from "../types";

const MainMenu: React.FC<MainMenuProps> = ({ setScreen }) => {
  return (
    <div className="main-menu">
      <h1 className="menu-title">Zombie Survivor</h1>
      <div className="menu-buttons">
        <button onClick={() => setScreen('game')}>Start Game</button>
        <button onClick={() => setScreen('leaderboard')}>LeaderBoard</button>
        <button onClick={() => setScreen('options')}>Options</button>
        <button onClick={() => setScreen('credits')}>Credits</button>
      </div>
    </div>
  );
};

export default MainMenu