export default class SimpleDom {
  private dom: HTMLElement;

  constructor(elementName: keyof HTMLElementTagNameMap) {
    this.dom = document.createElement(elementName);
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
