import { GameCustomEvent, GameCustomEventDetail } from "../game";
import SD, { sd } from "../simple-dom";

export default class BasicComponent {
  static sequence: number = 1;

  id: number;
  dom: SD;
  children: BasicComponent[];
  parent: BasicComponent | null;

  onUpdate(event: GameCustomEventDetail) { };

  add(child: BasicComponent) {
    this.dom.apd(child.dom);
    this.children.push(child);
    child.parent = this;
  }

  remove() {
    this.children.forEach(child => child.remove());
    if (this.parent) {
      this.dom.rmv();
      const index = this.parent.children.findIndex(node => node.id === this.id);
      index >= 0 && (this.parent.children.splice(index, 1));
      this.parent = null;
    }
  }
  
  constructor(elementType: keyof HTMLElementTagNameMap) {
    this.id = BasicComponent.sequence++;
    this.dom = sd(elementType);
    this.children = [];
    this.parent = null;

    window.addEventListener('Updated', event => {
      this.onUpdate((event as GameCustomEvent).detail);
    });
  }
}