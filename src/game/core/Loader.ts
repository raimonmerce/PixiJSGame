import { Assets, Texture } from 'pixi.js';

export default class Loader {
  private static textures: Map<string, Texture> = new Map();

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

      console.log("All assets loaded");
    } catch (error) {
      console.error("Error loading assets", error);
      throw error;
    }
  }

  static getTexture(path: string): Texture | undefined {
    return this.textures.get(path);
  }
}
