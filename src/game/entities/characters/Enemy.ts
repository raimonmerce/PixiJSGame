import Character from "./CharacterBase";
import type { EnemyOptions } from "../../../types";
export class Enemy extends Character {
  score: number;

  constructor({ score, ...characterStats }: EnemyOptions) {
    super(characterStats);
    this.score = score;
  }

update(delta: number): void {
  super.update(delta);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  // const centerX = 360 / 2;
  // const centerY = 360 / 2;

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
