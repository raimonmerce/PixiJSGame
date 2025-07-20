import { useEffect, useRef } from 'react';
import { Game } from '../game/core/Game';
import type { GameProps } from '../types';

export default function GameCanvas({ score, setScore }: GameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameInstanceRef = useRef<Game | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && containerRef.current) {
      initializedRef.current = true;

      const game = new Game({ score, setScore }); // ⬅️ Pass the setter to Game
      game.init(containerRef.current);
      gameInstanceRef.current = game;
    }
  }, []);

  return <div ref={containerRef} className='test' />;
}
