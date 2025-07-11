import { Graphics, Container } from 'pixi.js';

export class HealthBar extends Container {
    private background: Graphics;
    private foreground: Graphics;
    private maxHealth: number;
    private currentHealth: number;
    private widthPerHealth: number;
    private barHeight = 5;

    constructor(maxHealth: number, x = 0, y = 0) {
        super();

        this.maxHealth = maxHealth;
        this.currentHealth = maxHealth;
        this.widthPerHealth = 1;

        const totalWidth = maxHealth * this.widthPerHealth;

        this.background = new Graphics();
        this.background.rect(0, 0, totalWidth, this.barHeight)
        .fill({
            color: 0x000000,
        })
        this.addChild(this.background);

        this.foreground = new Graphics();
        this.foreground.rect(0, 0, totalWidth, this.barHeight)
        .fill({
            color: 0xff0000,
        })
        this.addChild(this.foreground);

        this.x = x;
        this.y = y;
    }

    takeDamage(amount: number): void {
        this.currentHealth = Math.max(0, this.currentHealth - amount);
        this.updateBar();
        console.log("A")
    }

    // Call this to heal
    heal(amount: number): void {
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount);
        this.updateBar();
    }

    private updateBar(): void {
        console.log("B")
        const newWidth = (this.currentHealth / this.maxHealth) * this.maxHealth * this.widthPerHealth;
        this.foreground.clear();
        this.foreground.rect(0, 0, newWidth, this.barHeight)
        .fill({
            color: 0xff0000,
        })
        console.log("C")
    }
}
