import GameObject from "../../core/GameObject";
import { AnimatedSprite, Sprite } from 'pixi.js';

export default abstract class CharacterBase extends GameObject {
  health: number;
  attack: number;
  speed: number;

  constructor(
    sprite: Sprite | AnimatedSprite,
    health: number,
    attack: number,
    speed: number,
    x = 0,
    y = 0
  ) {
    super(sprite, x, y);
    this.health = health;
    this.attack = attack;
    this.speed = speed;
  }

  update(delta: number): void {
    super.update(delta);
  }

  takeDamage(amount: number): void {
    this.health -= amount;
    if (this.health < 0) this.health = 0;
  }

  isAlive(): boolean {
    return this.health > 0;
  }
}
