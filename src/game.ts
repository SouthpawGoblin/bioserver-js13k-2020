import { ProductBundle } from "./constants";
import BasicComponent from "./components/Basic";

export interface GameState {
  paused: boolean;
  likes: number;
  turnCount: number;
  successCount: number;
  failCount: number;
  inventory: ProductBundle[];
}

export type GameCustomEventDetail = {
  oldState: GameState | null;
  newState: GameState;
};

export type GameCustomEvent = CustomEvent<GameCustomEventDetail>;

export const needsUpdate = (detail: GameCustomEventDetail, field: keyof GameState): boolean => {
  if (!detail.oldState) {
    return true;
  } else {
    return JSON.stringify(detail.oldState[field]) !== JSON.stringify(detail.newState[field]);
  }
}

const UpdateEvent = document.createEvent('CustomEvent') as GameCustomEvent;

export default class Game {
  static state: Readonly<GameState> | null = null;
  static children: BasicComponent[] = [];

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

  static add(comp: BasicComponent) {
    document.body.appendChild(comp.dom.getDom());
    this.children.push(comp);
  }

  static togglePause() {
    Game.setState({
      ...Game.state!,
      paused: !Game.state!.paused,
    });
  }

  static start() {
    // press space key to toggle pause
    window.addEventListener('keyup', event => {
      if (event.key === ' ') {
        Game.togglePause();
      }
    });

    Game.setState({
      paused: false,
      likes: 0,
      turnCount: 1,
      successCount: 0,
      failCount: 0,
      inventory: [],
    });
  }
}