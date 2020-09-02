import { ID_NONE, BUNDLE_INDEX, Product, ID_404, CREATURES, CLASSES, COLORS, DEAL_DELAY, PRODUCT_BUNDLES } from "./constants";
import BasicComponent from "./components/Basic";
import BaseCard from "./components/response-cards/BaseCard";
import SimpleDom from "./simple-dom";
import likeSvg from './assets/like.svg';

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
  timeout: number;
  paused: boolean;
  likes: number;
  turnCount: number;
  successCount: number;
  failCount: number;
  inventory: BUNDLE_INDEX[];
  lastRequest?: Request;
  currentRequest: Request;
  nextRequest: Request;
  lastDealedCardId: number;
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

export const randPoolItem = <T>(pool: T[]) => {
  return { ...pool[Math.floor(Math.random() * pool.length)] };
}

export const getResText = (wholeSet: Product[], id: number): string => {
  if (id === ID_NONE) {
    return '-';
  } else if (id === ID_404) {
    return '404';
  } else {
    return wholeSet.find(item => item.id === id)?.name || '';
  }
}

export const getResLikes = (wholeSet: Product[], reqId: number, resId: number, isCreature: boolean): SimpleDom => {
  let likeText = '';
  const prod = wholeSet.find(item => item.id === resId);
  if (resId === ID_NONE) {
    likeText = isCreature ? ': 0' : ' * 1';
  } else if (resId === ID_404) {
    likeText = isCreature ? ': 1' : ' * 1';
  } else if (reqId !== resId) {
    likeText = isCreature ? ': 0' : ' * 1';
  } else {
    likeText = isCreature ? `: ${prod?.value}` : ` * ${prod?.value}`;
  }
  return getLikeDom(likeText);
}

export const getResClass = (reqId: number, resId: number): string => {
  if (resId === ID_NONE) {
    return 'res blank';
  } else if (resId === reqId) {
    return 'res correct';
  } else {
    return 'res wrong';
  }
}

export const getDealCardById = (id: number): SimpleDom | null => {
  if (id === ID_NONE) {
    const blank = new SimpleDom('div');
    blank.class('class blank');
    return blank;
  } else if (id === ID_404) {
    const cardComponent = new BaseCard({
      id: ID_404,
      name: '404',
      value: 1,
      type: 'CREATURE',
      bundle: BUNDLE_INDEX.WILD_ANIMALS,
    });
    return cardComponent.dom;
  } else {
    const prod = [...CREATURES, ...COLORS, ...CLASSES].find(p => p.id === id);
    if (prod) {
      const cardComponent = new BaseCard(prod);
      return cardComponent.dom;
    } else {
      return null;
    }
  }
}

export const calcTurnLikes = (request: Request): number => {
  if (request.reqCreatureId !== request.resCreatureId) {
    return request.resCreatureId === ID_404 ? 1 : 0;
  } else {
    let likes = CREATURES.find(card => card.id === request.resCreatureId)!.value;
    if (request.reqClassId !== ID_NONE && request.reqClassId === request.resClassId) {
      likes *= CLASSES.find(card => card.id === request.resClassId)!.value;
    }
    if (request.reqColorId !== ID_NONE && request.reqColorId === request.resColorId) {
      likes *= COLORS.find(card => card.id === request.resColorId)!.value;
    }
    return likes;
  }
}

export const getLikeDom = (text: string): SimpleDom => {
  const dom = new SimpleDom('div');
  dom.class('like');
  const likeImg = document.createElement('img');
  likeImg.src = likeSvg;
  const textDom = document.createElement('span');
  textDom.innerText = text;
  dom.getDom().appendChild(likeImg);
  dom.getDom().appendChild(textDom);
  return dom;
}

const UpdateEvent = document.createEvent('CustomEvent') as GameCustomEvent;

export default class Game {
  private static requestSequence = 1;
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

  static generateRequest(inventory: BUNDLE_INDEX[]): Request {
    const creatureId = CREATURES.map(c => c.id)[Math.floor(Math.random() * CREATURES.length)];
    let classId = ID_NONE;
    let colorId = ID_NONE;
    if (inventory.includes(BUNDLE_INDEX.CLASSES)) {
      classId = CLASSES.map(c => c.id)[Math.floor(Math.random() * CLASSES.length)];
    }
    if (inventory.includes(BUNDLE_INDEX.COLORS)) {
      colorId = COLORS.map(c => c.id)[Math.floor(Math.random() * COLORS.length)];
    }
    return {
      id: Game.requestSequence++,
      reqCreatureId: creatureId,
      resCreatureId: ID_NONE,
      reqClassId: classId,
      resClassId: ID_NONE,
      reqColorId: colorId,
      resColorId: ID_NONE,
    };
  }

  static start() {
    // press space key to toggle pause
    window.addEventListener('keyup', event => {
      if (event.key === ' ') {
        Game.togglePause();
      }
    });
    // initial inventory
    const inventory = [BUNDLE_INDEX.WILD_ANIMALS, BUNDLE_INDEX.COLORS, BUNDLE_INDEX.CLASSES];
    // initial state
    const currentRequest = Game.generateRequest(inventory);
    const nextRequest = Game.generateRequest(inventory);
    Game.setState({
      timeout: 8000,
      paused: false,
      likes: 0,
      turnCount: 1,
      successCount: 0,
      failCount: 0,
      inventory,
      lastRequest: undefined,
      currentRequest,
      nextRequest,
      lastDealedCardId: ID_NONE,
    });
  }

  static nextTurn() {
    const deltaLikes = calcTurnLikes(Game.state!.currentRequest);
    Game.setState({
      ...Game.state!,
      likes: Game.state!.likes + deltaLikes,
      turnCount: Game.state!.turnCount + 1,
      successCount: Game.state!.successCount + (deltaLikes > 0 ? 1 : 0),
      failCount: Game.state!.failCount + (deltaLikes > 0 ? 0 : 1),
      lastRequest: { ...Game.state!.currentRequest },
      currentRequest: { ...Game.state!.nextRequest },
      nextRequest: Game.generateRequest(Game.state!.inventory),
    });
  }

  static dealCard(card: BaseCard) {
    if (Game.state!.paused) {
      return;
    }
    const newState: GameState = JSON.parse(JSON.stringify(Game.state!));
    const prod = card.product;
    if (prod.id === ID_404) {
      newState.currentRequest.resCreatureId = ID_404;
      newState.lastDealedCardId = ID_404;
    } else {
      newState.lastDealedCardId = card.id;
      if (prod.type === 'CREATURE') {
        newState.currentRequest.resCreatureId = prod.id;
      } else if (prod.type === 'COLOR') {
        newState.currentRequest.resColorId = prod.id;
      } else if (prod.type === 'CLASS') {
        newState.currentRequest.resClassId = prod.id;
      }
    }
    Game.setState(newState);
    if (newState.currentRequest.resCreatureId !== ID_NONE) {
      setTimeout(() => {
        Game.nextTurn();
      }, DEAL_DELAY);
    }
  }

  static buyBundle(id: number) {
    const bundle = PRODUCT_BUNDLES.find(bun => bun.id === id)!
    if (Game.state!.likes < bundle.price) {
      throw new Error('Insufficient Likes')
    } else {
      Game.setState({
        ...Game.state!,
        likes: Game.state!.likes - bundle.price,
        inventory: [...Game.state!.inventory, id],
      })
    }
  }
}
