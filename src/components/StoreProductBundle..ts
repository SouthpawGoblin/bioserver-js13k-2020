import BasicComponent from "./Basic";
import { BUNDLE_INDEX, ProductBundle } from "../constants";
import SD, { sd } from "../simple-dom";
import Game, { getLikeDom, GameCustomEventDetail, isChanged } from "../game";
import './store-product-bundle.scss';
import ProductBundleDetail from "./ProductBundleDetail";

export default class StoreProductBundle extends BasicComponent {
  bundle: ProductBundle
  sold: boolean

  constructor(bundle: ProductBundle) {
    super('div')
    this.sold = false
    this.dom.cls('store-product-bundle')
    this.bundle = bundle
    const title = sd('div')
      .cls('title')
      .tt(bundle.name)
    this.dom.apd(title)
    const desc = sd('div')
      .cls('desc')
      .tt(bundle.desc)
    this.dom.apd(desc)
    const cost = sd('div')
      .cls('cost')
      .tt('Cost: ')
    cost.apd(getLikeDom(String(bundle.price), 1, true))
    this.dom.apd(cost)
    // bundle detail
    this.add(new ProductBundleDetail(bundle))
    // click event
    this.dom.getDom().addEventListener('click', () => {
      if (this.bundle.id === BUNDLE_INDEX.WILD_ANIMALS) {
        return
      }
      let timeoutId = -1
      if (!this.sold) {
        try {
          Game.buyBundle(bundle.id)
        } catch (e) {
          cost.cls('cost red')
          clearTimeout(timeoutId)
          setTimeout(() => cost.cls('cost'), 500)
        }
      }
    })
    // hover event
    this.dom.getDom().addEventListener('mouseenter', () => {
      this.children.forEach(child => child.dom.cls('bundle-detail show'))
    })
    this.dom.getDom().addEventListener('mouseleave', () => {
      this.children.forEach(child => child.dom.cls('bundle-detail'))
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
    if (this.bundle.id === BUNDLE_INDEX.WILD_ANIMALS) {
      this.dom.cls('store-product-bundle sold')
      this.sold = true
    } else if (Game.state!.inventory.includes(this.bundle.id)) {
      this.dom.cls('store-product-bundle sold')
      this.sold = true
    } else {
      this.dom.cls('store-product-bundle')
      this.sold = false
    }
  }
}
