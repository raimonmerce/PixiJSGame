import { Assets, Container, Sprite } from 'pixi.js';
import { Player } from '../entities/characters/Player';
import Controller from '../core/Controller';
import { Enemy } from '../entities/characters/Enemy';

export class Scene extends Container {
  private player?: Player;
  private enemies: Enemy[];

  constructor(controller: Controller) {
    super();
    this.enemies = [];
    this.loadPlayer(controller);
    this.loadEnemy();
  }

  private async loadPlayer(controller: Controller) {
    try {
      const playerTexture = await Assets.load("images/player.png");
      const sprite = new Sprite(playerTexture);
      sprite.width = 100;
      sprite.height = 100;

      this.player = new Player(sprite, controller , 100, 150);
      this.addChild(this.player.sprite);
    } catch (error) {
      console.error("Failed to load palyer texture", error);
    }
  }

  private async loadEnemy() {
    try {
      const enemyTexture = await Assets.load("images/enemy.png");
      const sprite = new Sprite(enemyTexture);
      sprite.width = 100;
      sprite.height = 100;
      const enemy = new Enemy(sprite, 100, 150)
      this.enemies.push(enemy);
      this.addChild(enemy.sprite);
    } catch (error) {
      console.error("Failed to load enemy texture", error);
    }
  }

  update(delta: number) {
    if (this.player) this.player.update(delta);
    this.enemies.forEach(enemy => enemy.update(delta))
  }
}
