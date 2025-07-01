import Character from "./CharacterBase";
import { AnimatedSprite, Sprite } from 'pixi.js';
export class Enemy extends Character {
  name: string;

  constructor(sprite: Sprite | AnimatedSprite, x = 0, y = 0, name: string) {
    super(sprite, 100, 5, 0.3, x, y);
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
