import { useState } from 'react';
import GameCanvas from './components/GameCanvas';
import './App.css'

function App() {
  const [score, setScore] = useState(0);
  return (
    <div>
      <GameCanvas setScore={setScore} score={score} />
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white', fontFamily: 'Alagard' }}>
        <h1>Survivor demo</h1>
      </div>

      <div style={{ position: 'absolute', top: 20, right: 20, color: 'white', fontFamily: 'Alagard' }}>
        <h1>Score: {score}</h1>
      </div>
    </div>
  );
}

export default App
