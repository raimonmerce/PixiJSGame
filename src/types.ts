import { Sprite, AnimatedSprite, TilingSprite } from 'pixi.js';
import type Controller from './game/core/Controller';
export type ScreenType = 'menu' | 'game' | 'options' | 'credits' | 'leaderboard' | 'gameover';
export type Direction = 'up' | 'down' | 'left' | 'right';
export interface GameObjectOptions {
  sprite: Sprite | AnimatedSprite | TilingSprite;
  x?: number;
  y?: number;
}

export interface WeaponOptions extends GameObjectOptions {
  attack: number,
  speed: number,
}

export interface CharacterStats extends GameObjectOptions {
  maxHealth: number;
  attack: number;
  speed: number;
}

export interface PlayerOptions extends CharacterStats {
  controller: Controller;
}

export interface EnemyOptions extends CharacterStats {
  score: number;
}

export interface FloorOptions extends GameObjectOptions {
  name: string;
}

export interface MainMenuProps {
  setScreen: (screen: ScreenType) => void;
}
export interface GameProps {
  score: number;
  setScore: (score: number) => void;
  setScreen: (screen: ScreenType) => void;
}
export interface GameOverProps {
  score: number;
  setScreen: (screen: ScreenType) => void;
}
export interface OptionsProps {
  setScreen: (screen: ScreenType) => void;
}
export interface CreditsProps {
  setScreen: (screen: ScreenType) => void;
}
export interface LeaderBoardProps {
  score: number;
  setScreen: (screen: ScreenType) => void;
}