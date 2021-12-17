import { BaseComponent } from "../BaseComponent";
import { Router } from "../router";

export class ContentElement extends BaseComponent {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.containerContent = new BaseComponent(this.parentElement, "div", ["content_container"], "");
    this.router = new Router(this.containerContent);

    location.hash = "#home";
    this.startView = this.router.updateLocation(window.location.hash);

    window.addEventListener("hashchange", () => {
      this.containerContent.destroy();
      this.router = new Router(this.containerContent);
      this.router.updateLocation(window.location.hash);
    });
  }
}
