import BasicComponent from "./Basic";
import { ProductBundle, CREATURES, BUNDLE_INDEX, COLORS, CLASSES } from "../constants";
import BaseCard from "./response-cards/BaseCard";

import './product-bundle-detail.scss'

export default class ProductBundleDetail extends BasicComponent {
  constructor(bundle: ProductBundle) {
    super('div')
    this.dom.class('bundle-detail')
    if (bundle.type === 'CARD_PACK') {
      CREATURES.filter(c => c.bundle === bundle.id).forEach(c => {
        this.add(new BaseCard(c))
      })
    } else if (bundle.type === 'MULTIPLIER') {
      if (bundle.id === BUNDLE_INDEX.COLORS) {
        COLORS.forEach(prod => {
          this.add(new BaseCard(prod))
        })
      } else if (bundle.id === BUNDLE_INDEX.CLASSES) {
        CLASSES.forEach(prod => {
          this.add(new BaseCard(prod))
        })
      }
    }
  }
}
