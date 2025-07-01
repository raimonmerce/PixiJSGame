// src/entities/Player.ts
import { Graphics } from 'pixi.js';
import type Controller from '../core/Controller';

export class Player extends Graphics {
  controller: Controller;
  speed = 0.2;

  constructor(controller: Controller) {
    super();
    this.controller = controller;

    this.circle(0,0,20)
    .fill({
        color: 0x0000ff,
    })

    this.x = 100;
    this.y = 100;
  }

  update(delta: number) {
    if (this.controller.isPressed('up')) this.y -= this.speed * delta;
    if (this.controller.isPressed('down')) this.y += this.speed * delta;
    if (this.controller.isPressed('left')) this.x -= this.speed * delta;
    if (this.controller.isPressed('right')) this.x += this.speed * delta;
  }
}
