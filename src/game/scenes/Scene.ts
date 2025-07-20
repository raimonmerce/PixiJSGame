import {  Container, Sprite, TilingSprite } from 'pixi.js';
import { Player } from '../entities/characters/Player';
import { Enemy } from '../entities/characters/Enemy';
import { Sword } from '../entities/weapon/Sword';
import { Floor } from '../entities/scenario/Floor';
import { CharacterFactory } from '../entities/characters/CharacterFactory';
import type WeaponBase from '../entities/weapon/WeaponBase';
import type GameObject from '../core/GameObject';
import Controller from '../core/Controller';
import Loader from '../core/Loader';

export class Scene extends Container {
  private player?: Player;
  private enemies: Enemy[] = [];
  private weapons: WeaponBase[] = [];
  private controller: Controller;
  private floor: Floor;

  constructor(controller: Controller) {
    super();
    this.controller = controller
    this.init();
  }

  private async init() {
    try {
      const assetPaths = {
        player: "images/player/player.json",
        enemy: "images/enemy/enemy.json",
        sword: "images/sword/sword.png",
        tile: "images/tile/tile.png",
      };

      await Loader.preloadGroup(assetPaths);

      const [swordSprite, tileSprite, enemyAnimated] = await Promise.all([
        Loader.getSprite('sword'),
        Loader.getSprite('tile'),
        Loader.getAnimatedSprite('enemy')
      ]);

      if ( !swordSprite || !tileSprite || !enemyAnimated) {
        throw new Error('Missing required sprites after loading.');
      }
      this.createFloor(tileSprite);
      this.createPlayer();
      this.createWeapon(swordSprite);
      this.startEnemySpawn();

    } catch (error) {
      console.error("Failed to initialize scene", error);
    }
  }

  private startEnemySpawn(): void {
    setInterval(() => {
      const spawnDistance = 60;
      const side = Math.floor(Math.random() * 4); // 0 = top, 1 = right, 2 = bottom, 3 = left

      let x = 0;
      let y = 0;

      switch (side) {
        case 0: // top
          x = Math.random() * window.innerWidth;
          y = -spawnDistance;
          break;
        case 1: // right
          x = window.innerWidth + spawnDistance;
          y = Math.random() * window.innerHeight;
          break;
        case 2: // bottom
          x = Math.random() * window.innerWidth;
          y = window.innerHeight + spawnDistance;
          break;
        case 3: // left
          x = -spawnDistance;
          y = Math.random() * window.innerHeight;
          break;
      }

      this.createEnemyAt(x, y);
    }, 1000);
  }

  private async createPlayer() {
    try {
      this.player = await CharacterFactory.createDefaultPlayer(this.controller);
      if (this.player) this.addChild(this.player.sprite);
      else console.error("Failed to initialize player");
    } catch (error) {
      console.error("Failed to initialize scene", error);
    } 
  }

  private async createEnemyAt(x = 0, y = 0) {
    try {
      const enemy = await CharacterFactory.createDefaultEnemy(x, y);
      if (!enemy) {
        console.error("Failed to initialize enemy");
        return;
      }
      this.enemies.push(enemy);
      this.addChild(enemy.sprite);
    } catch (error) {
      console.error("Failed to initialize scene", error);
    }
  }

  private createWeapon(sprite: Sprite) {
    const sword = new Sword({
      attack: 5,
      speed: 0.002,
      sprite: sprite,
      x: 500,
      y: 500
    });
    this.weapons.push(sword);
    this.addChild(sword.sprite);
  }

  private createFloor(sprite: Sprite) {
    const tileSprite = new TilingSprite({
      texture: sprite.texture,
      width: window.innerWidth * 10,
      height:  window.innerHeight * 10
    });
    this.floor = new Floor({
      name: "test",
      sprite: tileSprite,
      x: 0,
      y: 0
    });
    this.addChild(this.floor.sprite);
  }

  update(delta: number): void {
    if (!this.player) return;
    this.player?.update(delta);

    let newX = this.x;
    let newY = this.y;

    let dx = 0;
    let dy = 0;

    if (this.controller.isPressed('up')) dy += 1;
    if (this.controller.isPressed('down')) dy -= 1;
    if (this.controller.isPressed('left')) dx += 1;
    if (this.controller.isPressed('right')) dx -= 1;

    const length = Math.hypot(dx, dy);

    if (length > 0) {
        dx /= length;
        dy /= length;
    }

    newX += dx * this.player.speed * delta;
    newY += dy * this.player.speed * delta;

    this.floor.addPosition(newX, newY)
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      
      if (this.player && this.checkCollision(this.player, enemy)) {
        if(this.player.hasWeapon()) enemy.takeDamage(1)
        else this.player.takeDamage(1);
      }

      if (!enemy.isAlive()) {
        this.enemies.splice(i, 1);
        enemy.destroy();
      } else {
        enemy.addPosition(newX, newY)
        enemy.update(delta)
      }
    }

    for (const weapon of this.weapons) {
      weapon.update(delta);
      if (this.player && !weapon.attached && this.checkCollision(this.player, weapon)) {
        this.player.equipWeapon(weapon);
      }

      if (!weapon.attached) weapon.addPosition(newX, newY)
    }
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
