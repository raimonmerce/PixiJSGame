import {  Container, Sprite, TilingSprite, Texture, AnimatedSprite } from 'pixi.js';
import { Player } from '../entities/characters/Player';
import { Enemy } from '../entities/characters/Enemy';
import { Sword } from '../entities/weapon/Sword';
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

  constructor(controller: Controller) {
    super();
    this.controller = controller
    this.init();
  }

  private async init() {
    try {
      const assetPaths = {
        player: "images/player/player.json",
        enemy: "images/boom/boom.json",
        sword: "images/sword/sword.png",
        tile: "images/tile/tile.png",
      };

      await Loader.preloadGroup(assetPaths);

      const [swordSprite, tileSprite, animatedGuy] = await Promise.all([
        Loader.getSprite('sword'),
        Loader.getSprite('tile'),
        Loader.getAnimatedSprite('boom')
      ]);

      if ( !swordSprite || !tileSprite || !animatedGuy) {
        throw new Error('Missing required sprites after loading.');
      }
      this.createFloor(tileSprite);
      this.createEnemy(animatedGuy);
      this.createPlayer();
      this.createWeapon(swordSprite);

    } catch (error) {
      console.error("Failed to initialize scene", error);
    }
  }

  private async createPlayer() {
    try {
      this.player = await CharacterFactory.createDefaultPlayer(this.controller);
      console.log("this.player", this.player)
      if (this.player) this.addChild(this.player.sprite);
    } catch (error) {
      console.error("Failed to initialize scene", error);
    } 
  }

  private createEnemy(sprite: Sprite| AnimatedSprite) {
    sprite.width *= 2;
    sprite.height *= 2;

    const enemy = new Enemy({
      name: "Carlos",
      maxHealth: 50,
      attack: 5,
      speed: 0.5,
      sprite: sprite,
      x: 200,
      y: 200
    });
    this.enemies.push(enemy);
    this.addChild(enemy.sprite);
  }

  private createWeapon(sprite: Sprite) {
    sprite.width = sprite.width * 2;
    sprite.height = sprite.height * 2;
    const sword = new Sword({
      attack: 5,
      speed: 0.5,
      sprite: sprite,
      x: 500,
      y: 500
    });
    this.weapons.push(sword);
    this.addChild(sword.sprite);
  }

  private createFloor(sprite: Sprite) {
    const tilingBackground = new TilingSprite(
      sprite.texture,
      window.innerWidth,
      window.innerHeight
    );

    tilingBackground.position.set(0, 0);

    this.addChild(tilingBackground);
  }

  update(delta: number): void {
    this.player?.update(delta);

    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];

      if (this.player && this.checkCollision(this.player, enemy)) {
        if(this.player.hasWeapon()) enemy.takeDamage(1)
        else this.player.takeDamage(1);
      }

      if (!enemy.isAlive()) {
        this.enemies.splice(i, 1);
        enemy.destroy();
      }
    }

    for (const weapon of this.weapons) {
      weapon.update(delta);
      if (this.player && !weapon.attached && this.checkCollision(this.player, weapon)) {
        this.player.equipWeapon(weapon);
      }
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
