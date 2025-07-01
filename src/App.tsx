import GameCanvas from './components/GameCanvas';
import './App.css'

function App() {
    return (
    <div>
      <GameCanvas />
      <div style={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
        <h1>Survivior demo</h1>
      </div>
    </div>
  );
}

export default App
