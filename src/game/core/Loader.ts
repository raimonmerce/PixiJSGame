import { Assets, Texture, Sprite, Spritesheet, AnimatedSprite } from 'pixi.js';

export default class Loader {
  private static textures: Map<string, Texture> = new Map();
  private static animatedSprite: AnimatedSprite;

  // Define all asset paths here
  private static assetPaths: string[] = [
    "images/player.png",
    "images/enemy.png",
    "images/sword.png",
    "images/tile.png",
  ];

  static async preloadAll(): Promise<void> {
    try {
      const loadedTextures = await Promise.all(
        this.assetPaths.map(path => Assets.load(path))
      );

      loadedTextures.forEach((texture, i) => {
        this.textures.set(this.assetPaths[i], texture);
      });
      this.preLoadSpritesheet()

    } catch (error) {
      console.error("Error loading assets", error);
      throw error;
    }
  }

  static async preLoadSpritesheet(): Promise<AnimatedSprite> {
    try {
      const spritesheet: Spritesheet = await Assets.load('https://pixijs.com/assets/spritesheet/0123456789.json');
      const texturesSpritesheet = [];

      for (let i = 0; i < 10; i++) {
        const framekey = `0123456789 ${i}.ase`;
        const texture = Texture.from(framekey);
        texturesSpritesheet.push(texture);
      }

      this.animatedSprite = new AnimatedSprite(texturesSpritesheet);
      this.animatedSprite.animationSpeed = 1 / 10;
      this.animatedSprite.loop = true;
      this.animatedSprite.play();

      return this.animatedSprite;
    } catch (error) {
      console.error("Error loading spritesheet", error);
      throw error;
    }
  }

  static getTexture(path: string): Sprite | undefined {
    return new Sprite(this.textures.get(path));
  }

  static getAnimatedSprite(): AnimatedSprite | undefined{
    return this.animatedSprite;
  }
}
