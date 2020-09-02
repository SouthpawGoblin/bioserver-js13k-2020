import BasicComponent from "./Basic";
import Game, { GameCustomEventDetail, isChanged } from "../game";
import './store.scss'
import SimpleDom from "../simple-dom";
import { PRODUCT_BUNDLES } from "../constants";
import StoreProductBundle from "./StoreProductBundle.";

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
    const packRow = new StoreRow()
    PRODUCT_BUNDLES.filter(bun => bun.type === 'CARD_PACK').forEach(bun => {
      packRow.add(new StoreProductBundle(bun))
    })
    this.add(packRow)
    // multiplier packs
    const multiRow = new StoreRow()
    PRODUCT_BUNDLES.filter(bun => bun.type === 'MULTIPLIER').forEach(bun => {
      packRow.add(new StoreProductBundle(bun))
    })
    this.add(multiRow)
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'paused')) {
      const paused = Game.state!.paused
      this.dom.class(paused ? 'store' : 'store hide')
    }
  }
}

export class StoreRow extends BasicComponent {
  constructor() {
    super('div')
    this.dom.class('store-row')
  }
}
