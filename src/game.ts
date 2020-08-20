import { ProductBundle } from "./constants";

export interface GameState {
  paused: boolean;
  likes: number;
  turnCount: number;
  successCount: number;
  failCount: number;
  inventory: ProductBundle[];
}

export type GameCustomEvent = CustomEvent<{
  oldState: GameState;
  newState: GameState;
}>;

const UpdateEvent = document.createEvent('CustomEvent') as GameCustomEvent;

export default class Game {
  static state: Readonly<GameState>;
  static setState(newState: GameState) {
    UpdateEvent.initCustomEvent('Updated', true, false, {
      oldState: Game.state,
      newState: newState
    });
    Game.state = {
      ...newState,
      inventory: [...newState.inventory],
    };
    window.dispatchEvent(UpdateEvent);
  }
}