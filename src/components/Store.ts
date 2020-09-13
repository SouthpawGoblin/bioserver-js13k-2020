import BasicComponent from "./Basic";
import Game, { GameCustomEventDetail, isChanged } from "../game";
import './store.scss'
import SimpleDom from "../simple-dom";
import { PRODUCT_BUNDLES } from "../constants";
import StoreProductBundle from "./StoreProductBundle.";

export default class Store extends BasicComponent {
  likeCount: SimpleDom;

  constructor() {
    super('div')
    this.dom.class('store')
    // header
    const header = new SimpleDom('div')
    header.class('header')
    header.text('Expansion Packs & Multipliers for Sale !')
    this.likeCount = (new SimpleDom('span')).text('Likes: 0').class('like-count')
    header.append(this.likeCount)
    this.dom.append(header)
    // expansion packs
    const packRow = new StoreRow()
    const packRowHeader = new SimpleDom('div')
    packRowHeader.class('row-header')
    const packRowName = new SimpleDom('div')
    packRowName.text('Expansion Packs:').class('row-name')
    const packRowDesc = new SimpleDom('div')
    packRowDesc.text('"more creature cards with higher value of Likes"').class('row-desc')
    packRowHeader.append(packRowName).append(packRowDesc)
    packRow.dom.append(packRowHeader)
    PRODUCT_BUNDLES.filter(bun => bun.type === 'CARD_PACK').forEach(bun => {
      packRow.add(new StoreProductBundle(bun))
    })
    this.add(packRow)
    // multiplier packs
    const multiRow = new StoreRow()
    const multiRowHeader = new SimpleDom('div')
    multiRowHeader.class('row-header')
    const multiRowName = new SimpleDom('div')
    multiRowName.text('Multipliers:').class('row-name')
    const multiRowDesc = new SimpleDom('div')
    multiRowDesc.text('"card decorations to multiply card\'s value of Likes"').class('row-desc')
    multiRowHeader.append(multiRowName).append(multiRowDesc)
    multiRow.dom.append(multiRowHeader)
    PRODUCT_BUNDLES.filter(bun => bun.type === 'MULTIPLIER').forEach(bun => {
      multiRow.add(new StoreProductBundle(bun))
    })
    this.add(multiRow)
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'paused')) {
      const paused = Game.state!.paused
      this.dom.class(paused ? 'store' : 'store hide')
    }
    if (isChanged(detail, 'likes')) {
      this.likeCount.text(`Likes: ${detail.newState.likes}`)
    }
  }
}

export class StoreRow extends BasicComponent {
  constructor() {
    super('div')
    this.dom.class('store-row')
  }
}
