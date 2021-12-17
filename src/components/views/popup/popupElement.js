import { getImage } from "../../../api/api";
import { BaseComponent } from "../../BaseComponent";
import { ImageElement } from "../../ImageElement";
import correct from "../../../assets/correct_answ.svg";
import wrong from "../../../assets/wrong-answer.svg";
import "./popup.scss";

export class Popup extends BaseComponent {
  constructor(options, resultAnswer = false) {
    super(document.getElementById("app"), "div", ["cover", "hidden"]);
    /*  this.appElement = document.getElementById("app");
    this.cover = new BaseComponent(this.appElement, "div", ["cover", "hidden"]) */
    this.data = { author: this.author, name: this.name, year: this.year, imageNum: this.imageNum };
    this.options = options || function () {};
    this.resultAnswer = resultAnswer;
  }

  init() {
    this.popupElement = new BaseComponent(this.element, "div", ["popup"]);
    this.imgStatus = new ImageElement(this.popupElement.element, 30, 30, `${this.resultAnswer ? correct : wrong}`);
    this.image = new ImageElement(this.popupElement.element, 180, 180, this.getImage());
    this.popupContent = new BaseComponent(
      this.popupElement.element,
      "div",
      ["popup_content"],
      "",
      `Correct answer: <div>${this.dataQuestion.name}</div> <div>${this.dataQuestion.author}</div> <div>${this.dataQuestion.year}</div>`
    );
    this.btnNext = new BaseComponent(
      this.popupElement.element,
      "button",
      ["popup_btnNext"],
      "",
      `${this.dataQuestion.imageNum + (1 % 10) !== 9 ? "next" : "end"}`
    );

    this.btnNext.element.addEventListener("click", () => {
      this.hide();
      this.options.cb();
      this.element.classList.add("hidden");
      this.element.remove();
      /*       if(this.dataQuestion.imageNum+1%10===9)
       */
    });
  }
  set dataQuestion(data) {
    this.data = data;
  }
  get dataQuestion() {
    return this.data;
  }

  async getImage() {
    this.image.element.src = `${await getImage(this.data.imageNum)}`;
  }
  hide() {
    this.element.remove();
  }

  show() {
    this.element.classList.remove("hidden");
  }
  showResult() {
    this.imgStatus.element.remove();
    this.image.element.remove();
    this.popupContent.element.innerHTML = `<div class="popup_result>${localStorage.getItem("scoreRound")}/10</div>`;
  }
}
