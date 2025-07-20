import GameObject from "../../core/GameObject";
import type { FloorOptions } from "../../../types";
export class Floor extends GameObject {
  name: string;

  constructor({name, ...gameObjectStats}: FloorOptions) {
    super(gameObjectStats);
    this.name = name;
  }
}
