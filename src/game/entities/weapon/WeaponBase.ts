import GameObject from "../../core/GameObject";
import { AnimatedSprite, Sprite } from 'pixi.js';

export default abstract class WeaponBase extends GameObject {
  abstract name: string;
  attack: number;
  speed: number;
  attached: boolean;

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
    this.attached = false;
  }

  attachedWeapon(): void {

  }

  use(): void {

  }

  update(delta: number): void {
    super.update(delta);
  }
}
