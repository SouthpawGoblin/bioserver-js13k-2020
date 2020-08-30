import BasicComponent from "../Basic";
import { Product, ID_404, DEAL_DELAY } from "../../constants";
import Game from "../../game";

import './card.scss';

export default class BaseCard extends BasicComponent {
  product: Product;

  constructor(prod: Product) {
    super('div');
    this.product = prod;
    this.dom.class('card init');
    setTimeout(() => {
      this.dom.class('card');
    }, DEAL_DELAY);
    this.dom.getDom().onclick = (event: MouseEvent) => {
      this.onClick(event);
    }
    this.dom.text(prod.name);
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
      }, DEAL_DELAY);
    }
  }
}