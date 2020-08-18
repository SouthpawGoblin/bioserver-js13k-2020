import $ from './event';

type GameState = 'NONE' | 'RUNNING' | 'WIN' | 'LOSE';
type Inventory = 'BASIC_DECK' | ''

export default class Game {
  private static _instance: Game | undefined = undefined;
  private _gameState: GameState = 'NONE';
  private _paused: boolean = false;
  private _likes: number = 0;
  private _turnCount: number = 1;
  private _successCount: number = 0;
  private _failCount: number = 0;
  
  static getInstance(): Game {
    if (!Game._instance) {
      Game._instance = new Game();
    }
    return Game._instance;
  }

  get gameState() {
    return this._gameState
  }
  set gameState(state: GameState) {
    $.dispatch('GameStateChanged', {
      oldVal: this._gameState,
      newVal: state,
    });
    this._gameState = state;
  }

  get paused() {
    return this._paused;
  }
  set paused(flag: boolean) {
    $.dispatch('PauseChanged', {
      oldVal: this._paused,
      newVal: flag,
    });
    this._paused = flag;
  }

  get likes() {
    return this._likes;
  }
  set likes(num: number) {
    $.dispatch('LikesChanged', {
      oldVal: this._likes,
      newVal: num,
    });
    this._likes = num;
  }

  get turnCount() {
    return this._turnCount;
  }
  set turnCount(num: number) {
    $.dispatch('TurnCountChanged', {
      oldVal: this._turnCount,
      newVal: num,
    });
    this._turnCount = num;
  }

  get successCount() {
    return this._successCount;
  }
  set successCount(num: number) {
    $.dispatch('SuccessCountChanged', {
      oldVal: this._successCount,
      newVal: num,
    });
    this._successCount = num;
  }

  get failCount() {
    return this._failCount;
  }
  set failCount(num: number) {
    $.dispatch('FailCountChanged', {
      oldVal: this._failCount,
      newVal: num,
    });
    this._failCount = num;
  }

  init() {
    const instance = Game.getInstance();
    instance.gameState = 'NONE';
    instance.paused = false;
    instance.likes = 0;
    instance.successCount = 0;
    instance.failCount = 0;
  }

  start() {
    const instance = Game.getInstance();
    instance.gameState = 'RUNNING';
  }

  nextTurn() {
    const instance = Game.getInstance();
    instance.turnCount += 1;
  }
}
