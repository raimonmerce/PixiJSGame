import Character from "./CharacterBase";
import { AnimatedSprite, Sprite } from 'pixi.js';
import type Controller from '../../core/Controller';
import WeaponBase from "../weapon/WeaponBase";

export class Player extends Character {
  controller: Controller;
  private weapon?: WeaponBase;
  
  constructor(sprite: Sprite | AnimatedSprite, controller: Controller, x = 0, y = 0) {
    super(sprite, 100, 5, 0.5, x, y);
    this.controller = controller;
  }

  equipWeapon(weapon: WeaponBase): void {
    this.weapon = weapon;
    this.weapon.sprite.x = 0;
    this.weapon.sprite.y = 0;
    this.weapon.sprite.scale = 0.75;
    this.weapon.sprite.scale = 0.75;
    this.weapon.attachedWeapon();
    this.sprite.addChild(this.weapon.sprite) 
  }

  unequipWeapon(): void {
    this.weapon = undefined;
  }

  hasWeapon(): boolean {
    return this.weapon !== undefined;
  }

  getWeapon(): WeaponBase | null {
    return this.weapon ?? null;
  }

  getAttackPower(): number {
    return this.attack + (this.weapon ? this.weapon.attack : 0);
  }

  update(delta: number): void {
    super.update(delta);

    let newX = this.x;
    let newY = this.y;

    if (this.controller.isPressed('up')) newY -= this.speed * delta;
    if (this.controller.isPressed('down')) newY += this.speed * delta;
    if (this.controller.isPressed('left')) newX -= this.speed * delta;
    if (this.controller.isPressed('right')) newX += this.speed * delta;

    this.setPosition(newX, newY);

    this.weapon?.update(delta);
  }
}
