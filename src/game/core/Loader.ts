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

      assetEntries.forEach(([key, _], index) => {
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

        for (const [_, texture] of Object.entries(sheet.textures)) {
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

  static async getSprite(key: string): Promise<Sprite | undefined> {
    if (this.textures.has(key)) {
      return new Sprite(this.textures.get(key)!);
    }

    const path = `images/${key}.png`;
    try {
      const texture = await Assets.load(path);
      this.textures.set(key, texture);
      this.assetPaths.set(key, path);
      return new Sprite(texture);
    } catch (error) {
      console.warn(`Texture not found for key: ${key}`, error);
      return undefined;
    }
  }

  static async getAnimatedSprite(key: string): Promise<AnimatedSprite | undefined> {
    if (this.animations.has(key)) {
      return this.animations.get(key);
    }

    const path = `images/${key}.json`;
    try {
      const sheet: Spritesheet = await Assets.load(path);
      const frames: Texture[] = Object.values(sheet.textures);

      const anim = new AnimatedSprite(frames);
      anim.animationSpeed = 0.1;
      anim.loop = true;
      anim.play();

      this.animations.set(key, anim);
      this.assetPaths.set(key, path);
      return anim;
    } catch (error) {
      console.warn(`AnimatedSprite not found for key: ${key}`, error);
      return undefined;
    }
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
