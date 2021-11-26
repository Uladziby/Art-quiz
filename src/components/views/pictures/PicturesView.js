import { BaseComponent } from "../../BaseComponent";
import "./pictures.scss";
import images from "../../../inputDate/images";
import { CardElement } from "../../elements/cardElement/CardElement";

const SIZE_INPUT_ARRAY = images.length;
const NUMBER_QUESTIONS = 10;
const RANDOM_PAGE = 5;
const arrCategories = [
  "portrait",
  "landscape",
  "still life",
  "impressionism",
  "expressionism",
  "avant-garde",
  "renaissance",
  "surrealism",
  "kitsch",
  "minimalism",
  "set 11",
  "set 12",
];

export class PicturesView extends BaseComponent {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.pictures = new BaseComponent(this.parentElement.element, "div", ["picturesView"]);
    this.picturesHead = new BaseComponent(this.pictures.element, "div", ["pictures_head"]);
    this.btnHome = new BaseComponent(
      this.picturesHead.element,
      "button",
      ["pictures_head__btnHome"],
      "",
      "home"
    );
    this.btnHome.element.addEventListener("click", () => {
      location.hash = "#home";
    });
    this.titleHome = new BaseComponent(this.picturesHead.element, "span", ["pictures_head__title"]);
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
