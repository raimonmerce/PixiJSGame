import WeaponBase from "./WeaponBase";
import type { WeaponOptions } from "../../../types";

export class Sword extends WeaponBase {
    durability: number = 100;
    name = 'Sword';

    constructor({...weaponOptions}: WeaponOptions) {
        super(weaponOptions);
    }

    attachedWeapon(): void {
        this.attached = true;
        console.log("Attached!")
    }

    use(): void {
        if (this.durability > 0) {
        this.durability--;
        console.log("Sword used! Durability left:", this.durability);

        } else {
        console.log("Sword is broken!");
        }
    }

    update(delta: number): void {
        super.update(delta);
        // this.sprite.rotation += 0.005 * delta;
    }
}
