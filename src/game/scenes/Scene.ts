import { Container } from 'pixi.js';
import { Player } from '../entities/Player';
import Controller from '../core/Controller';

export class Scene extends Container {
  private player: Player;

  constructor(controller: Controller) {
    super();
    this.player = new Player(controller);
    this.addChild(this.player);
  }

  update(delta: number) {
    this.player.update(delta);
  }
}
