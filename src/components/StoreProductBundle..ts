import BasicComponent from "./Basic";
import { ProductBundle } from "../constants";
import SimpleDom from "../simple-dom";
import Game, { getLikeDom, GameCustomEventDetail, isChanged } from "../game";
import './store-product-bundle.scss';

export default class StoreProductBundle extends BasicComponent {
  bundle: ProductBundle
  sold: boolean

  constructor(bundle: ProductBundle) {
    super('div')
    this.sold = false
    this.dom.class('store-product-bundle')
    this.bundle = bundle
    const title = new SimpleDom('div')
    title
      .class('title')
      .text(bundle.name)
    this.dom.append(title)
    const desc = new SimpleDom('div')
    desc
      .class('desc')
      .text(bundle.desc)
    this.dom.append(desc)
    const cost = new SimpleDom('div')
    cost
      .class('cost')
      .text('Cost: ')
    cost.append(getLikeDom(String(bundle.price), 1, true))
    this.dom.append(cost)
    // click event
    this.dom.getDom().addEventListener('click', () => {
      let timeoutId = -1
      if (!this.sold) {
        try {
          Game.buyBundle(bundle.id)
        } catch (e) {
          cost.class('cost red')
          clearTimeout(timeoutId)
          setTimeout(() => cost.class('cost'), 500)
        }
      }
    })
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'paused')) {
      if (detail.newState.paused) {
        this.updateClass()
      }
    }
    if (isChanged(detail, 'inventory')) {
      this.updateClass()
    }
  }

  updateClass() {
    if (Game.state!.inventory.includes(this.bundle.id)) {
      this.dom.class('store-product-bundle sold')
      this.sold = true
    } else {
      this.dom.class('store-product-bundle')
      this.sold = false
    }
  }
}
