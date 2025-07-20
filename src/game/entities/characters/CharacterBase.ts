import GameObject from "../../core/GameObject";
import { HealthBar } from "../ui/healthBar";
import type{ CharacterStats } from "../../../types";
export default abstract class CharacterBase extends GameObject {
  health: number;
  maxHealth: number;
  attack: number;
  speed: number;
  healthBar: HealthBar;

  constructor({maxHealth, attack, speed, ...gameObjectStats }: CharacterStats) {
    super(gameObjectStats);
    this.health = maxHealth;
    this.maxHealth = maxHealth;
    this.attack = attack;
    this.speed = speed;
    this.healthBar = new HealthBar(maxHealth, this.sprite.width);
    this.healthBar.x = -this.sprite.width/2;
    this.healthBar.y = -this.sprite.height/2 - 10;
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
