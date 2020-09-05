import BasicComponent from "../Basic";
import { Product, ID_404, TURN_DELAY, PRODUCT_BUNDLES } from "../../constants";
import Game, { getLikeDom } from "../../game";

import './card.scss';
import SimpleDom from "../../simple-dom";

export default class BaseCard extends BasicComponent {
  product: Product;

  constructor(prod: Product) {
    super('div');
    this.product = prod;
    this.dom.class('card init');
    setTimeout(() => {
      this.dom.class('card');
    }, TURN_DELAY);
    this.dom.getDom().addEventListener('click', (event: MouseEvent) => {
      this.onClick(event);
    })
    const name = new SimpleDom('div')
    name.text(prod.name).class('name')
    this.dom.append(name)
    const bundle = PRODUCT_BUNDLES.find(bun => bun.id === prod.bundle)
    const seperator = bundle ? (bundle.type === 'CARD_PACK' ? ' : ' : ' * ') : ''
    this.dom.append(getLikeDom(`${seperator}${prod.value}`, 1))
  }

  onClick = (event: MouseEvent) => {
    if (Game.state!.paused) {
      return;
    }
    this.dom.class('card deal');
    Game.dealCard(this);
    if (this.product.id === ID_404) {
      setTimeout(() => {
        this.dom.class('card');
      }, TURN_DELAY);
    }
  }
}