import { AnimatedSprite, Sprite, TilingSprite } from 'pixi.js';
import type { GameObjectOptions } from '../../types';
export default abstract class GameObject {
  sprite: Sprite | AnimatedSprite | TilingSprite;
  private _x: number;
  private _y: number;

  constructor({ sprite, x = 0, y = 0 }: GameObjectOptions) {
    this.sprite = sprite;

    if ('anchor' in sprite) {
      sprite.anchor.set(0.5);
    }

    this._x = x;
    this._y = y;

    sprite.x = x;
    sprite.y = y;
  }

  update(delta: number): void {
    
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  getPosition(): { x: number; y: number } {
    return { x: this._x, y: this._y };
  }

  setPosition(x: number, y: number): void {
    this._x = x;
    this._y = y;
    this.sprite.x = x;
    this.sprite.y = y;
  }

  addPosition(x: number, y: number): void {
    this._x += x;
    this._y += y;
    this.sprite.x += x;
    this.sprite.y += y;
  }

  destroy(): void {

    if (this.sprite.parent) {
      this.sprite.parent.removeChild(this.sprite);
    }

    this.sprite.destroy({ texture: true, textureSource: true });
  }
}
