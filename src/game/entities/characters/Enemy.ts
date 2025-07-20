import Character from "./CharacterBase";
import type { EnemyOptions } from "../../../types";
export class Enemy extends Character {
  name: string;

  constructor({ name, ...characterStats }: EnemyOptions) {
    super(characterStats);
    this.name = name;
  }

update(delta: number): void {
  super.update(delta);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const dirX = centerX - this.x;
  const dirY = centerY - this.y;

  const length = Math.sqrt(dirX * dirX + dirY * dirY) || 1;
  const normX = dirX / length;
  const normY = dirY / length;

  const newX = this.x + normX * this.speed * delta;
  const newY = this.y + normY * this.speed * delta;

  this.setPosition(newX, newY);
}
}
