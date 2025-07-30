import { useState } from 'react';
import GameCanvas from './components/GameCanvas';
import MainMenu from './components/MainMenu';
import Options from './components/Options';
import GameOver from './components/GameOver';
import Credits from './components/Credits';
import LeaderBoard from './components/LeaderBoard';
import './App.css'
import type { ScreenType } from './types';

function App() {
  const [score, setScore] = useState(0);
  const [screen, setScreen] = useState<ScreenType>('menu');

  const renderScreen = () => {
    switch (screen) {
      case 'menu':
        return <MainMenu setScreen={setScreen} />;
      case 'game':
        return <GameCanvas setScore={setScore} score={score} setScreen={setScreen} />;
      case 'options':
        return <Options setScreen={setScreen} />;
      case 'credits':
        return <Credits setScreen={setScreen} />;
      case 'leaderboard':
        return <LeaderBoard score={score} setScreen={setScreen} />;
      case 'gameover':
        return <GameOver score={score} setScreen={setScreen} />;
      default:
        return <MainMenu setScreen={setScreen} />;
    }
  };

  return (
    <div className="mainApp">
      {renderScreen()}
    </div>
  );
}

export default App
