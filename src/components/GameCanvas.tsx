import { useEffect, useRef } from 'react';
import { Game } from '../game/core/Game';
import type { GameProps } from '../types';

export default function GameCanvas({ score, setScore, setScreen }: GameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameInstanceRef = useRef<Game | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && containerRef.current) {
      initializedRef.current = true;

      const game = new Game({ score, setScore, setScreen });
      game.init(containerRef.current);
      gameInstanceRef.current = game;
    }
  }, []);

  return (
    <>
      <div ref={containerRef} className='gameCanvas' />
      <div className='scoreGame'>
        <h2>Score: {score}</h2>
      </div>
    </>
  );
}
