import BasicComponent from "./Basic";
import SD, { sd } from "../simple-dom";
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
  container: SD;
  refreshCount: SD;

  constructor(type: ConveyorType, capacity: number = 4) {
    super('div');
    this.dom.cls('conveyor hidden');
    this.type = type;
    this.capacity = capacity;
    const content = sd('div').cls('conveyor-content');
    const title = sd('div')
      .cls('conveyor-title')
      .tt(
        type === 'CREATURE'
          ? 'Creatures' : type === 'COLOR'
          ? 'Colors' : type === 'CLASS'
          ? 'Classes' : ''
      );
    content.apd(title);
    this.container = content;
    this.dom.apd(content);
    // refresh button
    const refresh = sd('div')
      .cls('conveyor-refresh');
    refresh.apd(sd('div').tt('Refresh'));
    this.refreshCount = sd('div').tt('').cls('refresh');
    refresh.apd(this.refreshCount);
    refresh.getDom().addEventListener('click', () => {
      if (Game.state!.refreshLeft > 0) {
        this.refreshCards()
        Game.refresh()
      }
    })
    this.dom.apd(refresh);
  }

  onUpdate(detail: GameCustomEventDetail) {
    if (isChanged(detail, 'refreshLeft')) {
      this.refreshCount.tt(String(Game.state!.refreshLeft)).cls('refresh');
      if (Game.state!.refreshLeft <= 0) {
        this.refreshCount.cls('refresh zero');
      }
    }
    if (isChanged(detail, 'inventory')) {
      const inv = Game.state!.inventory;
      const pool = ALL_PRODUCTS.filter(prod => prod.type === this.type && inv.includes(prod.bundle));
      if (this.pool.length === 0 && pool.length > 0) {
        // init cards
        for (let i = 0; i < this.capacity; i++) {
          const card = new BaseCard(randPoolItem(pool));
          this.cards.push(card);
          this.container.apd(card.dom);
        }
        this.dom.cls('conveyor');
      }
      this.pool = pool;
    }
    if (isChanged(detail, 'systemRefreshToken') && this.type === 'CREATURE') {
      this.refreshCards()
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
              this.container.ppd(newCard.dom);
            }, TURN_DELAY);
          }
        }
      }
    }
  }

  refreshCards() {
    this.cards.forEach(card => card.dom.getDom().remove())
    this.cards = []
    for (let i = 0; i < this.capacity; i++) {
      const card = new BaseCard(randPoolItem(this.pool));
      this.cards.push(card);
      this.container.apd(card.dom);
    }
  }
}
