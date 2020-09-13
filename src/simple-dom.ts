export default class SD {
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

  cls(classNames: string) {
    this.dom.className = classNames;
    return this;
  }

  tt(text: string) {
    this.dom.innerText = text;
    return this;
  }

  apd(ele: SD) {
    this.dom.appendChild(ele.dom);
    return this;
  }

  ppd(ele: SD) {
    this.dom.prepend(ele.dom);
    return this;
  }

  attr(key: string, value: string) {
    this.dom.setAttribute(key, value);
    return this;
  }

  rmv() {
    this.dom.remove();
  }

  getDom(): HTMLElement {
    return this.dom;
  }
}

export const sd = (element: keyof HTMLElementTagNameMap | HTMLElement): SD => {
  return new SD(element)
}
