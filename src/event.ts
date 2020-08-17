const GameStateChangedEvent = document.createEvent('CustomEvent');
const PauseChangedEvent = document.createEvent('CustomEvent');
const LikesChangedEvent = document.createEvent('CustomEvent');
const TurnCountChangedEvent = document.createEvent('CustomEvent');
const SuccessCountChangedEvent = document.createEvent('CustomEvent');
const FailCountChangedEvent = document.createEvent('CustomEvent');

const GameEvents = {
  GameStateChanged: GameStateChangedEvent,
  PauseChanged: PauseChangedEvent,
  LikesChanged: LikesChangedEvent,
  TurnCountChanged: TurnCountChangedEvent,
  SuccessCountChanged: SuccessCountChangedEvent,
  FailCountChanged: FailCountChangedEvent,
};

export type GameEvent = keyof typeof GameEvents;

const evt = {
  on(type: GameEvent, cb: (event: Event) => void) {
    window.addEventListener(type, cb);
  },

  off(type: GameEvent, cb: (event: Event) => void) {
    window.removeEventListener(type, cb);
  },

  dispatch(type: GameEvent, args: { oldVal: any, newVal: any }) {
    GameEvents[type].initCustomEvent(type, true, false, args);
    window.dispatchEvent(GameEvents[type]);
  },
}

export default evt;
