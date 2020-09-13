import BasicComponent from "./Basic";
import Game, { GameCustomEventDetail, isChanged } from "../game";
import './store.scss'
import SD, { sd } from "../simple-dom";
import { PRODUCT_BUNDLES } from "../constants";
import StoreProductBundle from "./StoreProductBundle.";

export default class Store extends BasicComponent {
  likeCount: SD;

  constructor() {
    super('div')
    this.dom.cls('store')
    // header
    const header = sd('div')
      .cls('header')
      .tt('Expansion Packs & Multipliers for Sale !')
    this.likeCount = sd('span').tt('Likes: 0').cls('like-count')
    header.apd(this.likeCount)
    this.dom.apd(header)
    // expansion packs
    const packRow = new StoreRow()
    const packRowHeader = sd('div')
      .cls('row-header')
    const packRowName = sd('div')
      .tt('Expansion Packs:').cls('row-name')
    const packRowDesc = sd('div')
      .tt('"more creature cards with higher value of Likes"').cls('row-desc')
    packRowHeader.apd(packRowName).apd(packRowDesc)
    packRow.dom.apd(packRowHeader)
    PRODUCT_BUNDLES.filter(bun => bun.type === 'CARD_PACK').forEach(bun => {
      packRow.add(new StoreProductBundle(bun))
    })
    this.add(packRow)
    // multiplier packs
    const multiRow = new StoreRow()
    const multiRowHeader = sd('div')
      .cls('row-header')
    const multiRowName = sd('div')
      .tt('Multipliers:').cls('row-name')
    const multiRowDesc = sd('div')
      .tt('"card decorations to multiply card\'s value of Likes"').cls('row-desc')
    multiRowHeader.apd(multiRowName).apd(multiRowDesc)
    multiRow.dom.apd(multiRowHeader)
    PRODUCT_BUNDLES.filter(bun => bun.type === 'MULTIPLIER').forEach(bun => {
      multiRow.add(new StoreProductBundle(bun))
    })
    this.add(multiRow)
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'paused')) {
      const paused = Game.state!.paused
      this.dom.cls(paused ? 'store' : 'store hide')
    }
    if (isChanged(detail, 'likes')) {
      this.likeCount.tt(`Likes: ${detail.newState.likes}`)
    }
  }
}

export class StoreRow extends BasicComponent {
  constructor() {
    super('div')
    this.dom.cls('store-row')
  }
}
