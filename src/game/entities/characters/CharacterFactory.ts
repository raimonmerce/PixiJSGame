import Controller from "../../core/Controller";
import Loader from "../../core/Loader";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import type { PlayerOptions } from "../../../types";


export class CharacterFactory {
    static async createDefaultPlayer(controller: Controller): Promise<Player | undefined> {
        try {
            const sprite = await Loader.getAnimatedSprite('player');

            if (!sprite) {
                console.error("Failed loading player texture");
                return undefined;
            }

            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            return new Player({
                controller: controller,
                maxHealth: 50,
                attack: 5,
                speed: 0.5,
                sprite: sprite,
                x: centerX,
                y: centerY
            });
        } catch (error) {
            console.error("Failed to create Player:", error);
            return undefined;
        }
    }

    static async createDefaultEnemy(x = 0, y = 0): Promise<Enemy | undefined> {
        try {
            const sprite = await Loader.getAnimatedSprite('boom');

            if (!sprite) {
                console.error("Failed loading player texture");
                return undefined;
            }

            return new Enemy({
                name: "Carlos",
                maxHealth: 50,
                attack: 5,
                speed: 0.5,
                sprite: sprite,
                x: x,
                y: y
            });
        } catch (error) {
            console.error("Failed to create Player:", error);
            return undefined;
        }
    }
}
