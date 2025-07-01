type GameEvents = {
  playerHit: number;
  playerP
  enemyDied: string;
  levelComplete: null;
};

class TypedEventBus<Events extends Record<string, any>> {
  private events: { [K in keyof Events]?: ((payload: Events[K]) => void)[] } = {};

  on<K extends keyof Events>(event: K, callback: (payload: Events[K]) => void) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event]!.push(callback);
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]) {
    this.events[event]?.forEach(cb => cb(payload));
  }

  off<K extends keyof Events>(event: K, callback: (payload: Events[K]) => void) {
    this.events[event] = this.events[event]?.filter(cb => cb !== callback);
  }
}

// Usage
const gameBus = new TypedEventBus<GameEvents>();
gameBus.on('enemyDied', (id) => console.log(`Enemy ${id} dead`));
gameBus.emit('enemyDied', 'enemy_42');
