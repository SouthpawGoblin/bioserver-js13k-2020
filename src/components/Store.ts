import BasicComponent from "./Basic";
import Game, { GameCustomEventDetail, isChanged } from "../game";
import './store.scss'

export default class Store extends BasicComponent {
  constructor() {
    super('div')
    this.dom.class('store')
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'paused')) {
      const paused = Game.state!.paused
      this.dom.class(paused ? 'store' : 'store hide')
    }
  }
}