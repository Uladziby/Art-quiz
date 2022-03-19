import { BaseComponent } from "../../BaseComponent";
import artists from "../../../assets/artists-quiz.png";
import pictures from "../../../assets/pictures-quiz.png";
import { ImageElement } from "../../ImageElement";
import "./home.scss";

export class HomeView extends BaseComponent {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.painters = new BaseComponent(this.parentElement.element, "div", [
      "painters",
    ]);
    this.pictures = new BaseComponent(this.parentElement.element, "div", [
      "pictures",
    ]);
    this.settings = new BaseComponent(this.parentElement.element, "div", [
      "settings",
    ]);

    this.linkPainters = new BaseComponent(
      this.painters.element,
      "a",
      ["painters_img", "cardAnime"],
      "",
      "<span>artists quiz</span>"
    );
    this.linkPainters.element.href = "#artists";
    this.imgPainters = new ImageElement(
      this.linkPainters.element,
      415,
      475,
      `${artists}`
    );

    this.linkPictures = new BaseComponent(
      this.pictures.element,
      "a",
      ["pictures_img", "cardAnime"],
      "",
      "<span>pictures quiz</span>"
    );
    this.linkPictures.element.href = "#pictures";
    this.imgPictures = new ImageElement(
      this.linkPictures.element,
      415,
      475,
      `${pictures}`
    );

    this.btnSettings = new BaseComponent(
      this.settings.element,
      "button",
      "",
      "",
      "Settings",
      "btn_settings"
    );
    this.btnSettings.element.addEventListener("click", () => {
      location.hash = "#settings";
    });
  }

  destroy() {
    this.parentElement.element.innerHTML = "";
  }
}
