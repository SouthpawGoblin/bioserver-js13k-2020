import { GameCustomEvent, GameCustomEventDetail } from "../game";
import SimpleDom from "../simple-dom";

export default class BasicComponent {
  static sequence: number = 1;

  id: number;
  dom: SimpleDom;
  children: BasicComponent[];
  parent: BasicComponent | null;

  onUpdate(event: GameCustomEventDetail) { };

  add(child: BasicComponent) {
    this.dom.append(child.dom);
    this.children.push(child);
    child.parent = this;
  }

  remove() {
    this.children.forEach(child => child.remove());
    if (this.parent) {
      this.dom.remove();
      const index = this.parent.children.findIndex(node => node.id === this.id);
      index >= 0 && (this.parent.children.splice(index, 1));
      this.parent = null;
    }
  }
  
  constructor(elementType: keyof HTMLElementTagNameMap) {
    this.id = BasicComponent.sequence++;
    this.dom = new SimpleDom(elementType);
    this.children = [];
    this.parent = null;

    window.addEventListener('Updated', event => {
      this.onUpdate((event as GameCustomEvent).detail);
    });
  }
}