import { ProductBundle, Products, ID_NONE } from "./constants";
import BasicComponent from "./components/Basic";

export interface Request {
  id: number;
  reqCardId: number;
  resCardId: number;
  reqColorId: number;
  resColorId: number;
  reqClassId: number;
  resClassId: number;
}

export interface GameState {
  paused: boolean;
  likes: number;
  turnCount: number;
  successCount: number;
  failCount: number;
  inventory: ProductBundle[];
  lastRequest?: Request;
  currentRequest: Request;
  nextRequest: Request;
}

export type GameCustomEventDetail = {
  oldState: GameState | null;
  newState: GameState;
};

export type GameCustomEvent = CustomEvent<GameCustomEventDetail>;

export const isChanged = (detail: GameCustomEventDetail, field: keyof GameState): boolean => {
  if (!detail.oldState) {
    return true;
  } else {
    return JSON.stringify(detail.oldState[field]) !== JSON.stringify(detail.newState[field]);
  }
}

const UpdateEvent = document.createEvent('CustomEvent') as GameCustomEvent;

export default class Game {
  static private requestSequence = 1;
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

  static generateRequest(): Request {
    const allCards = Products
      .filter(prod => prod.type === 'CARD')
      .reduce<number[]>((prev, cur) => {
        return [...prev, ...cur.items.map(item => item.id)]
      }, []);
    const cardId = allCards[Math.floor(Math.random() * allCards.length)];
    let classId = ID_NONE;
    let colorId = ID_NONE;
    if (Game.state?.inventory.includes())
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
      lastRequest: 
    });
  }
}