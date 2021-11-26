import { BaseComponent } from "../../BaseComponent";
import { getImage } from "../../../api/api";
import { shuffleAnswers } from "../pictures/commonFunc";
import { getRandomAuthor } from "../../../api/api";
import { Popup } from "../popup/popupElement";
import timerImg from"../../../assets/timer_picture.svg";


export class Question {
  constructor(parentElem, objRightAnsw) {
    this.indexCurrentQuestion = 0;
    const { author, name, year, imageNum } = objRightAnsw[this.indexCurrentQuestion];
    console.log(objRightAnsw, objRightAnsw[this.indexCurrentQuestion]);
    this.parentElem = parentElem;
    this.objRightAnsw = objRightAnsw;
    this.author = author;
    this.name = name;
    this.year = year;
    this.imageNum = imageNum;
    this.arrAnswers = [];
    this.popupIsActive = false;
    this.status = false;
    this.numOfTruth = 0;
    //Timer
    this.timerContainer = new BaseComponent(this.parentElem, "div", ["questions__timer"], "", "timer");
    this.settingsTimer = JSON.parse(localStorage.getItem("settings"));
    this.settingsTimer.timer ? (this.timerContainer.element.style.display = "flex") : (this.timerContainer.element.style.display = "none");
    this.timerImg = new BaseComponent(this.timerContainer.element,'img',['questions__timer_img'])
    this.timerImg.element.src = `${timerImg}`;
    this.timerTime = new BaseComponent (this.timerContainer.element, 'div') 

    this.containerImg = new BaseComponent(this.parentElem, "div", ["questions_img"]);
    this.img = new BaseComponent(this.containerImg.element, "img", ["questions_img__img"]);
    this.blockAnswers = new BaseComponent(this.parentElem, "div", ["questions_block"]);

    this.FuncActivePopup = this.activePopup.bind(this.popupIsActive);

    //this.FuncNextQuestion = this.nextQuestion.bind(this.img, this.blockAnswers);
    this.nextQuestion();
  }


  nextQuestion() {
    console.log(this.indexCurrentQuestion, this.objRightAnsw);
    if (this.indexCurrentQuestion === this.objRightAnsw.length - 1) {
      console.log(localStorage.getItem("scoreRound"), "finish");
    }
    this.img.element.style.opacity = 1;
    this.img.element.innerHTML = "";
    this.blockAnswers.element.innerHTML = "";
    this.setAnswers();
    this.setImage();
  }

  async setImage() {
    try {
      this.img.element.src = `${await getImage(this.imageNum)}`;
    } catch (error) {
      console.log(error, "setImage");
    }
  }
  async setAnswers() {
    try {
      this.arrAnswers.length = 0;
      this.arrAnswers.push(this.objRightAnsw[this.indexCurrentQuestion].author);
      await this.createRandomAnswers();
      this.arrAnswers.map((item) => {
        let elem = new BaseComponent(this.blockAnswers.element, "div", ["questions_block__answer"], "", `${item}`);
        elem.element.addEventListener("click", (e) => this.checkAnswer(e.target));
      });
    } catch (error) {
      console.log("setanswers");
    }
  }
  async createRandomAnswers() {
    while (this.arrAnswers.length !== 4) {
      this.arrAnswers.push(await getRandomAuthor());
    }
    shuffleAnswers(this.arrAnswers);
  }

  checkAnswer(element) {
    const targetElem = element.innerText;
    if (targetElem === this.objRightAnsw[this.indexCurrentQuestion].author) {
      element.classList.add("truth");
      this.status = true;
      this.numOfTruth++;
      localStorage.setItem("scoreRound", this.numOfTruth);
    } else {
      element.classList.add("lie");
      this.status = false;
    }
    this.showPopup();
    this.indexCurrentQuestion++;
    if (this.indexCurrentQuestion < this.objRightAnsw.length) {
      this.imageNum = this.objRightAnsw[this.indexCurrentQuestion].imageNum;
      this.nextQuestion();
    }
  }
  showPopup() {
    this.activePopup(true);
    this.appka = document.querySelector(".app");
    this.popup = new Popup(this.appka, this.objRightAnsw[this.indexCurrentQuestion], this.FuncActivePopup, this.status).open();
  }
  activePopup(signal) {
    this.popupIsActive = signal;
  }

  set statusAnswer(status) {
    this.status = status;
  }
  get statusAnswer() {
    return this.status;
  }
}
