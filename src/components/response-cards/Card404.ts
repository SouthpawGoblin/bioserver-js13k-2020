import BasicComponent from "../Basic";
import BaseCard from "./BaseCard";
import { ID_404, BUNDLE_INDEX } from "../../constants";

export default class Card404 extends BasicComponent {
  constructor() {
    super('section');
    this.dom.class('card-404');
    this.add(new BaseCard({
      id: ID_404,
      name: '404',
      value: 1,
      type: 'CREATURE',
      bundle: BUNDLE_INDEX.WILD_ANIMALS,
    }));
  }
}
