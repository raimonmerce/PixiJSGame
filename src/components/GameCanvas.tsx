import { useEffect, useRef } from 'react';
import { Game } from '../game/core/Game';

export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameInstanceRef = useRef<Game | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && containerRef.current) {
      initializedRef.current = true;

      const game = new Game();
      game.init(containerRef.current);
      gameInstanceRef.current = game;
    }
  }, []);

  return <div ref={containerRef} className='test'/>;
}
