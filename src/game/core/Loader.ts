import { Assets, Texture, Sprite, Spritesheet, AnimatedSprite } from 'pixi.js';
export default class Loader {
  private static textures: Map<string, Texture> = new Map();
  private static animations: Map<string, AnimatedSprite> = new Map();
  private static assetPaths: Map<string, string> = new Map();
  static async preloadGroup(assetPaths: Record<string, string>): Promise<void> {
    try {
      this.assetPaths = new Map(Object.entries(assetPaths));
      const assetEntries = Object.entries(assetPaths).filter(
        ([_, value]) => value.includes(".png")
      );
      const textures = await Promise.all(assetEntries.map(([_, path]) => Assets.load(path)));

      assetEntries.forEach(([key, path], index) => {
        this.textures.set(key, textures[index]);
      });
      await this.loadSpritesheet();
    } catch (error) {
      console.error("Error loading assets", error);
      throw error;
    }
  }

  private static async loadSpritesheet(): Promise<void> {
    try {
      const jsonEntries = Array.from(this.assetPaths.entries()).filter(
        ([, value]) => value.endsWith(".json")
      );

      for (const [key, path] of jsonEntries) {
        const sheet: Spritesheet = await Assets.load(path);
        const frames: Texture[] = [];

        for (const [frameKey, texture] of Object.entries(sheet.textures)) {
          frames.push(texture);
        }

        const anim = new AnimatedSprite(frames);
        anim.animationSpeed = 0.1;
        anim.loop = true;
        anim.play();

        this.animations.set(key, anim);
      }
    } catch (error) {
      console.error("Error loading spritesheet(s):", error);
      throw error;
    }
  }

  static getTexture(key: string): Sprite | undefined {
    const texture = this.textures.get(key);
    return texture ? new Sprite(texture) : undefined;
  }

  static getAnimatedSprite(key: string): AnimatedSprite | undefined {
    return this.animations.get(key);
  }

  static unloadAsset(key: string): void {
    if (this.textures.has(key)) {
      const texture = this.textures.get(key);
      texture?.destroy(true);
      this.textures.delete(key);
      console.log(`Texture ${key} unloaded`);
    }

    if (this.animations.has(key)) {
      const anim = this.animations.get(key);
      //anim?.destroy({ children: true, texture: true, baseTexture: true });
      anim?.destroy();
      this.animations.delete(key);
      console.log(`AnimatedSprite ${key} unloaded`);
    }

    const path = this.assetPaths.get(key);
    if (path) {
      Assets.unload(path);
      this.assetPaths.delete(key);
      console.log(`Path ${path} removed from assetPaths`);
    }
  }
}
