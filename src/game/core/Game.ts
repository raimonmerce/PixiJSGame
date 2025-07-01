import { Application } from 'pixi.js';
import { Scene } from '../scenes/Scene';
import Controller from './Controller';

export class Game {
  app: Application;
  controller: Controller;

  constructor() {
    this.app = new Application();
    this.controller = new Controller();
  }

  async init(containerRef: HTMLDivElement) {
    await this.app.init({
        resizeTo: window,
        backgroundColor: 0xaaaaaa,
    });

    containerRef.appendChild(this.app.view as HTMLCanvasElement);

    const scene = new Scene(this.controller);
    this.app.stage.addChild(scene);
        this.app.ticker.add((delta) => {
            scene.update(delta.deltaMS);
        });
    }
}
