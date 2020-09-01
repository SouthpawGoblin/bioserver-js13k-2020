import BasicComponent from "./Basic";
import Game, { GameCustomEventDetail, isChanged } from "../game";
import './store.scss'
import SimpleDom from "../simple-dom";

export default class Store extends BasicComponent {
  constructor() {
    super('div')
    this.dom.class('store')
    // header
    const header = new SimpleDom('div')
    header.class('header')
    header.text('Expansion Packs & Multipliers for Sale !')
    this.dom.append(header)
    // expansion packs
    // TODO:
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'paused')) {
      const paused = Game.state!.paused
      this.dom.class(paused ? 'store' : 'store hide')
    }
  }
}