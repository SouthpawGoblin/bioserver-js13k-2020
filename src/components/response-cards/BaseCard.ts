import BasicComponent from "../Basic";
import { Product } from "../../constants";
import Game from "../../game";

import './card.scss';

export default class BaseCard extends BasicComponent {
  product: Product;

  constructor(prod: Product) {
    super('div');
    this.product = prod;
    this.dom.class('card');
    this.dom.getDom().onclick = (event: MouseEvent) => {
      this.onClick(event);
    }
    this.dom.text(prod.name);
  }

  onClick = (event: MouseEvent) => {
    this.dom.class('card deal');
    setTimeout(() => {
      Game.dealCard(this);
    }, 1000)
  }
}