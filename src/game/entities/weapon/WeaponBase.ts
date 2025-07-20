import GameObject from "../../core/GameObject";
import type { WeaponOptions } from "../../../types";
export default abstract class WeaponBase extends GameObject {
  abstract name: string;
  attack: number;
  speed: number;
  attached: boolean;

  constructor({attack, speed, ...gameObjectStats}: WeaponOptions) {
    super(gameObjectStats);
    this.attack = attack;
    this.speed = speed;
    this.attached = false;
  }

  attachedWeapon(): void {

  }

  use(): void {

  }

  update(delta: number): void {
    super.update(delta);
  }
}
