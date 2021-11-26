import { getImage } from "../../../api/api";
import { BaseComponent } from "../../BaseComponent";
import { ImageElement } from "../../ImageElement";
import correct from "../../../assets/correct_answ.svg";
import wrong from "../../../assets/wrong-answer.svg";
import "./popup.scss";

export class Popup extends BaseComponent {
  constructor(parent, data, activePopup, status, nextQuestions) {
    console.log(nextQuestions);
    super(parent, "div", ["cover", "hidden"]);
    const { author, name, year, imageNum } = data;
    this.author = author;
    this.name = name;
    this.year = year;
    this.imageNum = imageNum;
    this.status = status;
    this.popupElement = new BaseComponent(this.element, "div", ["popup"]);
    this.imgStatus = new ImageElement(this.popupElement.element, 30, 30, `${this.status ? correct : wrong}`);
    this.image = new ImageElement(this.popupElement.element, 180, 180, this.getImage());
    this.popupContent = new BaseComponent(
      this.popupElement.element,
      "div",
      ["popup_content"],
      "",
      `Correct answer: <div>${data.name}</div> <div>${data.author}</div> <div>${data.year}</div>`
    );
    this.btnNext = new BaseComponent(this.popupElement.element, "button", ["popup_btnNext"], "", "next");

    this.btnNext.element.addEventListener("click", ()=> {
      this.hide();
      activePopup.popupIsActive = false;
    });
  }


  async getImage() {
    this.image.element.src = `${await getImage(this.imageNum)}`;
  }
  updateData() {
    this.popupContent.element.innerText = `${this.author}, ${this.name}, ${this.year}`;
  }

  hide() {
    this.element.remove()
  }

  open() {
    this.element.classList.remove("hidden");
  }
  showResult() {
    this.imgStatus.element.remove();
    this.image.element.remove();
    this.popupContent.element.innerHTML = `<div class="popup_result>${localStorage.getItem("scoreRound")}/10</div>`;
  }
}
