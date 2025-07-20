import { Application } from 'pixi.js';
import { Scene } from '../scenes/Scene';
import Controller from './Controller';
import type { GameProps } from '../../types';
export class Game {
  app: Application;
  controller: Controller;
  scene: Scene;

  constructor({...gameProps}: GameProps) {
    this.app = new Application();
    this.controller = new Controller();
    this.scene = new Scene(this.controller, gameProps);
  }

  async init(containerRef: HTMLDivElement) {
    await this.app.init({
        resizeTo: window,
        backgroundColor: 0xaaaaaa,
    });

    containerRef.appendChild(this.app.view as HTMLCanvasElement);

    this.app.stage.addChild(this.scene);
        this.app.ticker.add((delta) => {
            this.scene.update(delta.deltaMS);
        });
    }
}
