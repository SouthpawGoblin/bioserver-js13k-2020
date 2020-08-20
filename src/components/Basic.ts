import { GameState, GameCustomEvent } from "../game";

export default class BasicComponent {
  dom: HTMLElement;
  onStart() { };
  onUpdate(event: {
    oldState: GameState;
    newState: GameState;
  }) { };
  
  constructor() {
    this.dom = document.createElement('div');
    window.addEventListener('Updated', event => {
      this.onUpdate((event as GameCustomEvent).detail);
    });
  }
}