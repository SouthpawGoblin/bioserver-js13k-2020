import BasicComponent from "./Basic";
import SimpleDom from "../simple-dom";
import './conveyor.scss';
import { Product, ALL_PRODUCTS, ID_404, ID_NONE, TURN_DELAY } from "../constants";
import Game, { GameCustomEventDetail, isChanged, randPoolItem } from "../game";
import BaseCard from "./response-cards/BaseCard";

export type ConveyorType = 'CREATURE' | 'COLOR' | 'CLASS';

export default class Conveyor extends BasicComponent {
  type: ConveyorType;
  capacity: number;
  pool: Product[] = [];
  cards: BaseCard[] = [];
  container: SimpleDom;

  constructor(type: ConveyorType, capacity: number = 4) {
    super('div');
    this.dom.class('conveyor hidden');
    this.type = type;
    this.capacity = capacity;
    const content = new SimpleDom('div');
    content.class('conveyor-content');
    const title = new SimpleDom('div');
    title.class('conveyor-title');
    title.text(
      type === 'CREATURE'
        ? 'Creatures' : type === 'COLOR'
        ? 'Colors' : type === 'CLASS'
        ? 'Classes' : ''
    );
    content.append(title);
    this.container = content;
    this.dom.append(content);
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'inventory')) {
      const inv = Game.state!.inventory;
      const pool = ALL_PRODUCTS.filter(prod => prod.type === this.type && inv.includes(prod.bundle));
      if (this.pool.length === 0 && pool.length > 0) {
        // init cards
        for (let i = 0; i < this.capacity; i++) {
          const card = new BaseCard(randPoolItem(pool));
          this.cards.push(card);
          this.container.append(card.dom);
        }
        this.dom.class('conveyor');
      }
      this.pool = pool;
    }
    if (isChanged(detail, 'currentRequest')) {
      if (!detail.oldState) {
        return;
      }
      // delete dealed card and insert a new card
      const oldCR = detail.oldState.currentRequest;
      const newCR = detail.newState.currentRequest;
      if (oldCR.id !== newCR.id) {
        return;
      }
      let oldResId = ID_NONE;
      let newResId = ID_NONE;
      if (this.type === 'CREATURE') {
        oldResId = oldCR.resCreatureId;
        newResId = newCR.resCreatureId;
      } else if (this.type === 'COLOR') {
        oldResId = oldCR.resColorId;
        newResId = newCR.resColorId;
      } else if (this.type === 'CLASS') {
        oldResId = oldCR.resClassId;
        newResId = newCR.resClassId;
      }
      if (oldResId !== newResId) {
        if (newResId !== ID_404) {
          const index = this.cards.findIndex(card => card.id === Game.state!.lastDealedCardId);
          if (index >= 0) {
            setTimeout(() => {
              const card = this.cards.splice(index, 1);
              card[0].dom.getDom().remove();
              const newCard = new BaseCard(randPoolItem(this.pool));
              this.cards.unshift(newCard);
              this.container.prepend(newCard.dom);
            }, TURN_DELAY);
          }
        }
      }
    }
  }
}
