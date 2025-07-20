import { Sprite, AnimatedSprite, TilingSprite } from 'pixi.js';
import type Controller from './game/core/Controller';

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
  name: string;
}

export interface FloorOptions extends GameObjectOptions {
  name: string;
}