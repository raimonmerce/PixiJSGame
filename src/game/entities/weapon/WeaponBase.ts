import GameObject from "../../core/GameObject";
import { AnimatedSprite, Sprite } from 'pixi.js';

export default abstract class WeaponBase extends GameObject {
  health: number;
  attack: number;
  speed: number;

  constructor(
    sprite: Sprite | AnimatedSprite,
    attack: number,
    speed: number,
    x = 0,
    y = 0
  ) {
    super(sprite, x, y);
    this.attack = attack;
    this.speed = speed;
  }

  update(delta: number): void {
    super.update(delta);
  }
}
