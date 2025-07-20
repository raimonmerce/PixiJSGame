import Character from "./CharacterBase";
import type Controller from '../../core/Controller';
import WeaponBase from "../weapon/WeaponBase";
import type{ PlayerOptions } from "../../../types";
export class Player extends Character {
  controller: Controller;
  private weapon?: WeaponBase;
  
  constructor({ controller, ...characterStats }: PlayerOptions) {
    super(characterStats);
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
    this.weapon?.update(delta);
  }
}
