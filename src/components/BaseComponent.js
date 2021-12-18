export class BaseComponent {
  constructor(
    parentNode = null,
    tag = "div",
    className = [],
    // eslint-disable-next-line no-unused-vars
    styles = "",
    content = "",
    id = ""
  ) {
    this.parentNode = parentNode;
    this.element = document.createElement(tag);
    this.element.classList.add(...className);
    this.element.innerHTML = `${content}`;
    this.element.id = id;
    if (parentNode) {
      this.create();
    }
  }
  create() {
    this.parentNode.appendChild(this.element);
  }
  setContent(content) {
    this.element.innerHTMl = `${content}`;
  }
  destroy() {
    this.element.innerHTML = "";
  }
}
