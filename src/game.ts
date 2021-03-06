import { ID_NONE, BUNDLE_INDEX, Product, ID_404, CREATURES, CLASSES, COLORS, TURN_DELAY, PRODUCT_BUNDLES, DEFAULT_TIMEOUT } from "./constants";
import BasicComponent from "./components/Basic";
import BaseCard from "./components/response-cards/BaseCard";
import SD, { sd } from "./simple-dom";
import likeSvg from './assets/like.svg';

export interface Request {
  id: number;
  reqCreatureId: number;
  resCreatureId: number;
  reqColorId: number;
  resColorId: number;
  reqClassId: number;
  resClassId: number;
  timeout: number;
}

export interface GameState {
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
  refreshLeft: number;
  likesRequiredForBonusRefresh: number;
  systemRefreshToken: number;
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

export const getResLikes = (wholeSet: Product[], reqId: number, resId: number, isCreature: boolean): SD => {
  let likeText = '';
  const prod = wholeSet.find(item => item.id === resId);
  if (resId === ID_NONE) {
    likeText = isCreature ? ': -5' : ' \u00D7 1';
  } else if (resId === ID_404) {
    likeText = isCreature ? ': -1' : ' \u00D7 1';
  } else if (reqId !== resId) {
    likeText = isCreature ? ': -5' : ' \u00D7 1';
  } else {
    likeText = isCreature ? `: ${prod?.value}` : ` \u00D7 ${prod?.value}`;
  }
  return getLikeDom(likeText);
}

export const getResClass = (reqId: number, resId: number): string => {
  if (resId === ID_NONE) {
    return 'res blank';
  } else if (resId === ID_404) {
    return 'res not-found';
  } else if (resId === reqId) {
    return 'res correct';
  } else {
    return 'res wrong';
  }
}

export const getDealCardById = (id: number): SD | null => {
  if (id === ID_NONE) {
    const blank = sd('div').cls('class blank');
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
    return request.resCreatureId === ID_404 ? -1 : -5;
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

export const getLikeDom = (text: string, size?: number, swap?: boolean): SD => {
  const dom = sd('div').cls('like');
  const likeImg = document.createElement('img');
  likeImg.src = likeSvg;
  if (size) {
    likeImg.style.width = `${size}rem`;
  }
  const textDom = document.createElement('span');
  textDom.innerText = text;
  if (swap) {
    dom.getDom().appendChild(textDom);
    dom.getDom().appendChild(likeImg);
  } else {
    dom.getDom().appendChild(likeImg);
    dom.getDom().appendChild(textDom);
  }
  return dom;
}

export const showTurnResult = (likes: number) => {
  const result = sd('div')
  let content
  if (likes !== 0) {
    content = getLikeDom(` ${likes > 0 ? '+' : ''}${likes}`)
  } else {
    content = sd('span').tt('Pass')
  }
  result.apd(content)
  const classes = ['turn-result']
  if (likes < -1) {
    classes.push('fail')
  } else if (likes === -1) {
    classes.push('not-found')
  } else if (likes < 30) {
    classes.push('success')
  } else {
    classes.push('big-success')
  }
  result.cls(classes.join(' '))
  setTimeout(() => {
    result.cls(classes.join(' ') + ' animate')
  }, TURN_DELAY)
  const resultDom = result.getDom()
  document.body.appendChild(resultDom)
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

  static generateRequest(inventory: BUNDLE_INDEX[], timeout: number=DEFAULT_TIMEOUT): Request {
    const creatureIds = CREATURES
      .filter(c => inventory.includes(c.bundle))
      .map(c => c.id);
    const creatureId = creatureIds[Math.floor(Math.random() * creatureIds.length)];
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
      timeout,
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
    const inventory = [BUNDLE_INDEX.WILD_ANIMALS];
    // initial state
    const currentRequest = Game.generateRequest(inventory);
    const nextRequest = Game.generateRequest(inventory);
    Game.setState({
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
      refreshLeft: 5,
      likesRequiredForBonusRefresh: 3,
      systemRefreshToken: 0,
    });
  }

  static nextTurn() {
    const deltaLikes = calcTurnLikes(Game.state!.currentRequest);
    showTurnResult(deltaLikes)
    let timeout = DEFAULT_TIMEOUT
    if (Game.state!.inventory.includes(BUNDLE_INDEX.CLASSES)) {
      timeout += 4000
    }
    if (Game.state!.inventory.includes(BUNDLE_INDEX.COLORS)) {
      timeout += 4000
    }
    setTimeout(() => {
      Game.setState({
        ...Game.state!,
        likes: (Game.state!.likes + deltaLikes) > 0 ? (Game.state!.likes + deltaLikes) : 0,
        turnCount: Game.state!.turnCount + 1,
        successCount: Game.state!.successCount + (deltaLikes >= -1 ? 1 : 0),
        failCount: Game.state!.failCount + (deltaLikes >= -1 ? 0 : 1),
        lastRequest: { ...Game.state!.currentRequest },
        currentRequest: { ...Game.state!.nextRequest },
        nextRequest: Game.generateRequest(Game.state!.inventory, timeout),
        refreshLeft: deltaLikes >= Game.state!.likesRequiredForBonusRefresh ? Game.state!.refreshLeft + 1 : Game.state!.refreshLeft,
      });
    }, TURN_DELAY)
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
      Game.nextTurn();
    }
  }

  static buyBundle(id: number) {
    const bundle = PRODUCT_BUNDLES.find(bun => bun.id === id)!
    if (Game.state!.likes < bundle.price) {
      throw new Error('Insufficient Likes')
    } else {
      const inv = [...Game.state!.inventory]
      if (id === BUNDLE_INDEX.LEGENDARY_CREATURES) {
        const index = inv.findIndex(b => b === BUNDLE_INDEX.WILD_ANIMALS)
        inv.splice(index, 1, BUNDLE_INDEX.LEGENDARY_CREATURES)
        Game.setState({
          ...Game.state!,
          likes: Game.state!.likes - bundle.price,
          currentRequest: {
            ...Game.state!.currentRequest,
            reqCreatureId: 9,
          },
          nextRequest: {
            ...Game.state!.nextRequest,
            reqCreatureId: 10,
          },
          inventory: inv,
          systemRefreshToken: Game.state!.systemRefreshToken + 1,
        })
      } else {
        inv.push(id)
        Game.setState({
          ...Game.state!,
          likes: Game.state!.likes - bundle.price,
          inventory: inv,
        })
      }
    }
  }

  static refresh() {
    Game.setState({
      ...Game.state!,
      refreshLeft: Game.state!.refreshLeft > 0 ? Game.state!.refreshLeft - 1 : 0,
      likesRequiredForBonusRefresh: Game.state!.likesRequiredForBonusRefresh < 50 ? Game.state!.likesRequiredForBonusRefresh + 2 : 50,
    })
  }

  static win() {
    document.getElementById('win-req-count')!.innerText = String(Game.state!.currentRequest.id - 1)
    document.getElementById('win-splash')!.style.display = 'block'
  }
}
