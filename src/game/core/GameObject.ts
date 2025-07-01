import { AnimatedSprite, Sprite } from 'pixi.js';

export default abstract class GameObject {
  sprite: Sprite | AnimatedSprite;
  private _x: number;
  private _y: number;

  constructor(sprite: Sprite | AnimatedSprite, x = 0, y = 0) {
    this.sprite = sprite;
    this._x = x;
    this._y = y;
    this.sprite.x = x;
    this.sprite.y = y;
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
}
