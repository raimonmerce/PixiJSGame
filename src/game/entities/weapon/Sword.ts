import WeaponBase from "./WeaponBase";
import type { WeaponOptions } from "../../../types";

export class Sword extends WeaponBase {
    durability: number = 100;
    name = 'Sword';

    constructor({...weaponOptions}: WeaponOptions) {
        super(weaponOptions);
        this.sprite.anchor.set(0.5, 1.5);
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
        if (this.attached) {
            // this.sprite.rotation += this.speed * delta;
        }
    }
}
