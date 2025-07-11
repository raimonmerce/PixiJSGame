import {  Container, Sprite, TilingSprite, Texture } from 'pixi.js';
import { Player } from '../entities/characters/Player';
import Controller from '../core/Controller';
import Loader from '../core/Loader';
import { Enemy } from '../entities/characters/Enemy';
import type WeaponBase from '../entities/weapon/WeaponBase';
import { Sword } from '../entities/weapon/Sword';
import type GameObject from '../core/GameObject';

export class Scene extends Container {
  private player?: Player;
  private enemies: Enemy[];
  private weapons: WeaponBase[];
  private controller: Controller;

  constructor(controller: Controller) {
    super();
    this.controller = controller
    this.enemies = [];
    this.weapons = [];
    this.init();
  }

  private async init() {
    try {
      await Loader.preloadAll();

      const playerTexture = Loader.getTexture("images/player.png");
      const enemyTexture = Loader.getTexture("images/enemy.png");
      const swordTexture = Loader.getTexture("images/sword.png");
      const tileTexture = Loader.getTexture("images/tile.png");

      if (!playerTexture || !enemyTexture || !swordTexture || !tileTexture) {
        throw new Error("Missing textures after preload");
      }
      this.createFloor(tileTexture);
      this.createEnemy(enemyTexture);
      this.createPlayer(playerTexture);
      this.createWeapon(swordTexture);

    } catch (error) {
      console.error("Failed to initialize scene", error);
    }
  }

  private createPlayer(texture: Texture) {

    const sprite = new Sprite(texture);
    sprite.width = sprite.width * 2;
    sprite.height = sprite.height * 2;

    this.player = new Player(sprite, this.controller, 500, 100);
    this.addChild(this.player.sprite);
  }

  private createEnemy(texture: Texture) {
    const sprite = new Sprite(texture);
    sprite.width = sprite.width * 2;
    sprite.height = sprite.height * 2;

    const enemy = new Enemy(sprite, 200, 200, "Carlos");
    this.enemies.push(enemy);
    this.addChild(enemy.sprite);
  }

  private createWeapon(texture: Texture) {
    const sprite = new Sprite(texture);
    sprite.width = sprite.width * 2;
    sprite.height = sprite.height * 2;

    const sword = new Sword(sprite, 500, 500);
    this.weapons.push(sword);
    this.addChild(sword.sprite);
  }

  private createFloor(texture: Texture) {
    const tilingBackground = new TilingSprite(
      texture,
      window.innerWidth,
      window.innerHeight
    );

    tilingBackground.position.set(0, 0);

    this.addChild(tilingBackground);
  }

  update(delta: number) {
    if (this.player) this.player.update(delta);
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const obj = this.enemies[i];
      if (this.player) {
        if (this.checkCollision(this.player, obj)) {
          if (this.player.hasWeapon()) obj.takeDamage(1);
          else this.player.takeDamage(1);
        }
      }
      if (!obj.isAlive()) {
        this.enemies.splice(i, 1);
        obj.destroy();
      }
    }

    this.weapons.forEach(weapon => {
      weapon.update(delta)
      if (this.player && !weapon.attached) {
        if (this.checkCollision(this.player, weapon)) {
          this.player.equipWeapon(weapon)
        }
      }
    })
  }

  private checkCollision(obj1: GameObject, obj2: GameObject): boolean {
    const bounds1 = obj1.sprite.getBounds();
    const bounds2 = obj2.sprite.getBounds();

    return bounds1.x < bounds2.x + bounds2.width &&
          bounds1.x + bounds1.width > bounds2.x &&
          bounds1.y < bounds2.y + bounds2.height &&
          bounds1.y + bounds1.height > bounds2.y;
  }
}
