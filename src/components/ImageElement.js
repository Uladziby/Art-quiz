export class ImageElement {
  constructor(parentElement, width, heigth, src) {
    this.element = new Image(width, heigth);
    this.parentElement = parentElement;
    this.element.src = src;
    this.create();
  }
  create() {
    this.parentElement.appendChild(this.element);
  }
  destroy() {
    this.element.remove();
  }
}
