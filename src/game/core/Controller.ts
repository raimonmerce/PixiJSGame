import type { Direction } from "../../types";

type KeyState = {
  pressed: boolean;
  timestamp: number;
  doubleTap: boolean;
};

const keyMap: Record<string, Direction> = {
  KeyW: 'up',
  ArrowUp: 'up',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyD: 'right',
  ArrowRight: 'right',
};

export default class Controller {
  private keys: Record<Direction, KeyState> = {
    up: { pressed: false, timestamp: 0, doubleTap: false },
    down: { pressed: false, timestamp: 0, doubleTap: false },
    left: { pressed: false, timestamp: 0, doubleTap: false },
    right: { pressed: false, timestamp: 0, doubleTap: false },
  };

  private doubleTapThreshold = 250; // ms

  constructor() {
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown(e: KeyboardEvent) {
    const dir = keyMap[e.code];
    if (!dir) return;

    const key = this.keys[dir];
    const now = performance.now();

    if (!key.pressed && now - key.timestamp < this.doubleTapThreshold) {
      key.doubleTap = true;
    } else {
      key.doubleTap = false;
    }

    key.pressed = true;
    key.timestamp = now;
  }

  private handleKeyUp(e: KeyboardEvent) {
    const dir = keyMap[e.code];
    if (!dir) return;

    this.keys[dir].pressed = false;
  }

  isPressed(dir: Direction): boolean {
    return this.keys[dir].pressed;
  }

  isDoubleTapped(dir: Direction): boolean {
    return this.keys[dir].doubleTap;
  }

  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}
