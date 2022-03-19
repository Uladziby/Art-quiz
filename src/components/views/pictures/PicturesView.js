import { BaseComponent } from "../../BaseComponent";
import "./pictures.scss";
import { CardElement } from "../../elements/cardElement/CardElement";
import { arrCategories, SIZE_INPUT_ARRAY, NUMBER_QUESTIONS } from "./constants";


export class PicturesView extends BaseComponent {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.pictures = new BaseComponent(this.parentElement.element, "div", [
      "picturesView",
    ]);
    this.picturesHead = new BaseComponent(this.pictures.element, "div", [
      "pictures_head",
    ]);
    this.btnHome = new BaseComponent(
      this.picturesHead.element,
      "button",
      ["pictures_head__btnHome"],
      "",
      "home"
    );
    this.btnHome.element.addEventListener("click", () => {
      location.hash = "#home";
      this.destroy();
    });
    this.titleHome = new BaseComponent(this.picturesHead.element, "span", [
      "pictures_head__title",
    ]);
    this.btnScore = new BaseComponent(
      this.picturesHead.element,
      "button",
      ["pictures_head__btnScore"],
      "",
      "score"
    );
    this.containerCategories = new BaseComponent(this.pictures.element, "div", [
      "pictures_categories",
    ]);

    this.categories = Math.floor(SIZE_INPUT_ARRAY / NUMBER_QUESTIONS);
    arrCategories.map(
      (item, index) => new CardElement(this.containerCategories, item, index)
    );
  }
  
}
