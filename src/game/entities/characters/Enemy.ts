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

    const randomDirectionX = (Math.random() * 2) - 1;
    const randomDirectionY = (Math.random() * 2) - 1;

    const length = Math.sqrt(randomDirectionX * randomDirectionX + randomDirectionY * randomDirectionY) || 1;
    const normX = randomDirectionX / length;
    const normY = randomDirectionY / length;

    const newX = this.x + normX * this.speed * delta;
    const newY = this.y + normY * this.speed * delta;

    this.setPosition(newX, newY);
  }
}
