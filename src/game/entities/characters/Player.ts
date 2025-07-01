import Character from "./CharacterBase";
import { AnimatedSprite, Sprite } from 'pixi.js';
import type Controller from '../../core/Controller';
import WeaponBase from "../weapon/WeaponBase";

export class Player extends Character {
  controller: Controller;
  weapon?: WeaponBase;
  
  constructor(sprite: Sprite | AnimatedSprite, controller: Controller, x = 0, y = 0) {
    super(sprite, 50, 5, 0.5, x, y);
    this.controller = controller;
  }

  equipWeapon(weapon: WeaponBase): void {
    this.weapon = weapon;
  }

  unequipWeapon(): void {
    this.weapon = undefined;
  }

  getAttackPower(): number {
    // You can decide how to combine base attack + weapon attack
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
