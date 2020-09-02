import BasicComponent from "./Basic";
import { ProductBundle } from "../constants";
import SimpleDom from "../simple-dom";
import { getLikeDom } from "../game";

export default class StoreProductBundle extends BasicComponent {
  bundle: ProductBundle

  constructor(bundle: ProductBundle) {
    super('div')
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
    cost.text('Cost: ')
    cost.append(getLikeDom(String(bundle.price)))
    this.dom.append(cost)
  }
}
