import WeaponBase from "./WeaponBase";
import { Sprite } from 'pixi.js';

export class Sword extends WeaponBase {
    durability: number;
    name = 'Sword';

    constructor(
        sprite: Sprite,
        x = 0,
        y = 0,
        attack: number = 10,
        speed: number = 5,
        durability: number = 100
    ) {
        super(sprite, attack, speed, x, y);
        this.durability = durability;
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
