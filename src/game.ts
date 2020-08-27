import { ProductBundle, Products, ID_NONE, BUNDLE_INDEX, Product, ID_404 } from "./constants";
import BasicComponent from "./components/Basic";

export interface Request {
  id: number;
  reqCreatureId: number;
  resCreatureId: number;
  reqColorId: number;
  resColorId: number;
  reqClassId: number;
  resClassId: number;
}

export interface GameState {
  timeout: 3000;
  paused: boolean;
  likes: number;
  turnCount: number;
  successCount: number;
  failCount: number;
  inventory: BUNDLE_INDEX[];
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

export const getCardText = (wholeSet: Product[], id: number): string => {
  if (id === ID_NONE) {
    return '-';
  } else if (id === ID_404) {
    return '404';
  } else {
    return wholeSet.find(item => item.id === id)?.name || '';
  }
}

export const getCardClass = (bundleIndex: BUNDLE_INDEX): string => {
  return Game.state?.inventory.includes(bundleIndex) ? '' : 'hide';
}

const UpdateEvent = document.createEvent('CustomEvent') as GameCustomEvent;

export default class Game {
  private static requestSequence = 1;
  static state: Readonly<GameState> | null = null;
  static children: BasicComponent[] = [];
  static creatures: Product[] = [];
  static classes: Product[] = [];
  static colors: Product[] = [];

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
    const cardId = Game.creatures[Math.floor(Math.random() * Game.creatures.length)].id;
    let classId = ID_NONE;
    let colorId = ID_NONE;
    if (Game.state?.inventory.includes(BUNDLE_INDEX.CLASSES)) {
      classId = Math.ceil(Math.random() * Game.classes.length);
    }
    if (Game.state?.inventory.includes(BUNDLE_INDEX.COLORS)) {
      colorId = Math.ceil(Math.random() * Game.colors.length);
    }
    return {
      id: Game.requestSequence++,
      reqCreatureId: cardId,
      resCreatureId: ID_NONE,
      reqClassId: classId,
      resClassId: ID_NONE,
      reqColorId: colorId,
      resColorId: ID_NONE,
    };
  }

  static start() {
    // init statics
    Game.creatures = Products
      .filter(prod => prod.type === 'CARD')
      .reduce<Product[]>((prev, cur) => {
        return [...prev, ...cur.items]
      }, []);
    Game.classes = Products
      .find(prod => prod.id === BUNDLE_INDEX.CLASSES)!.items;
    Game.colors = Products
      .find(prod => prod.id === BUNDLE_INDEX.COLORS)!.items;

    // press space key to toggle pause
    window.addEventListener('keyup', event => {
      if (event.key === ' ') {
        Game.togglePause();
      }
    });

    // initial state
    const currentRequest = Game.generateRequest();
    const nextRequest = Game.generateRequest();
    Game.setState({
      timeout: 3000,
      paused: false,
      likes: 0,
      turnCount: 1,
      successCount: 0,
      failCount: 0,
      inventory: [],
      lastRequest: undefined,
      currentRequest,
      nextRequest,
    });
  }

  static nextTurn() {
    // TODO: 旧状态的结算
    const success = Game.state!.currentRequest.reqCreatureId === Game.state!.currentRequest.resCreatureId;
    Game.setState({
      ...Game.state!,
      turnCount: Game.state!.turnCount + 1,
      successCount: Game.state!.successCount + (success ? 1 : 0),
      failCount: Game.state!.failCount + (success ? 0 : 1),
      lastRequest: { ...Game.state!.currentRequest },
      currentRequest: { ...Game.state!.nextRequest },
      nextRequest: Game.generateRequest(),
    });
  }
}
