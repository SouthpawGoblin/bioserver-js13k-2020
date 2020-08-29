export default class SimpleDom {
  private dom: HTMLElement;

  constructor(element: keyof HTMLElementTagNameMap | HTMLElement) {
    if (typeof element === 'string') {
      this.dom = document.createElement(element);
    } else {
      this.dom = element;
    }
    return this;
  }

  id(id: string) {
    this.dom.id = id;
    return this;
  }

  class(classNames: string) {
    this.dom.className = classNames;
    return this;
  }

  text(text: string) {
    this.dom.innerText = text;
    return this;
  }

  append(ele: SimpleDom) {
    this.dom.appendChild(ele.dom);
    return this;
  }

  prepend(ele: SimpleDom) {
    this.dom.prepend(ele.dom);
    return this;
  }

  attr(key: string, value: string) {
    this.dom.setAttribute(key, value);
    return this;
  }

  remove() {
    this.dom.remove();
  }

  getDom(): HTMLElement {
    return this.dom;
  }
}
