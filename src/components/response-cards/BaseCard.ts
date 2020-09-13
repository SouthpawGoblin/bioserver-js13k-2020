import BasicComponent from "../Basic";
import { Product, ID_404, TURN_DELAY, PRODUCT_BUNDLES, BUNDLE_INDEX } from "../../constants";
import Game, { getLikeDom } from "../../game";

import './card.scss';
import SD, { sd } from "../../simple-dom";

export default class BaseCard extends BasicComponent {
  product: Product;

  constructor(prod: Product) {
    super('div');
    this.product = prod;
    this.dom.cls(`card init`);
    setTimeout(() => {
      this.dom.cls(`card`);
    }, TURN_DELAY);
    if (prod.bundle === BUNDLE_INDEX.COLORS) {
      this.dom.getDom().style.background = prod.color || '#ffffff'
    }
    if ([BUNDLE_INDEX.WILD_ANIMALS, BUNDLE_INDEX.LEGENDARY_CREATURES, BUNDLE_INDEX.UNICORM, BUNDLE_INDEX.DRAGON].includes(prod.bundle)) {
      this.dom.getDom().style.background = prod.color || '#ffffff'
    }
    this.dom.getDom().addEventListener('click', (event: MouseEvent) => {
      this.onClick(event);
    })
    const name = sd('div')
      .tt(prod.name).cls('name')
    if (prod.bundle === BUNDLE_INDEX.CLASSES) {
      const realDom = name.getDom()
      realDom.style.color = prod.color || '#000000'
      realDom.style.textShadow = '1px 1px #aaaaaa'
    }
    this.dom.apd(name)
    const bundle = PRODUCT_BUNDLES.find(bun => bun.id === prod.bundle)
    const seperator = bundle ? (bundle.type === 'CARD_PACK' ? ' : ' : ' \u00D7 ') : ''
    this.dom.apd(getLikeDom(`${seperator}${prod.value}`, 1))
  }

  onClick = (event: MouseEvent) => {
    if (Game.state!.paused) {
      return;
    }
    this.dom.cls('card deal');
    Game.dealCard(this);
    if (this.product.id === ID_404) {
      setTimeout(() => {
        this.dom.cls('card');
      }, TURN_DELAY);
    }
  }
}