import GameObject from "../../core/GameObject";
import { AnimatedSprite, Sprite } from 'pixi.js';
import { HealthBar } from "../ui/healthBar";
export default abstract class CharacterBase extends GameObject {
  health: number;
  maxHealth: number;
  attack: number;
  speed: number;
  healthBar: HealthBar;

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
    this.maxHealth = health;
    this.attack = attack;
    this.speed = speed;
    this.healthBar = new HealthBar(health);
    this.sprite.addChild(this.healthBar);
  }

  update(delta: number): void {
    super.update(delta);
  }

  takeDamage(amount: number): void {
    this.health -= amount;
    if (this.health < 0) this.health = 0;
    this.healthBar.takeDamage(amount);
  }

  isAlive(): boolean {
    return this.health > 0;
  }
}
