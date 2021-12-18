import { BaseComponent } from "../../BaseComponent";
import "./questions.scss";
import { NUMBER_QUESTIONS, QUESTION_PICTURES } from "../pictures/constants";
import { paginate } from "../pictures/commonFunc";
import { Question } from "./question";

export class QuestionsView extends BaseComponent {
  constructor(parentElement, indexCategory) {
    parentElement.destroy();
    super(parentElement.element, "div", ["questions"]);
    this.questionElement = new BaseComponent(
      this.element,
      "div",
      ["questions_title"],
      "",
      `${QUESTION_PICTURES}`
    );
    this.arrQuestions = this.getQuestions(indexCategory);
  }

  async getQuestions(index) {
    const res = await fetch("../../../inputDate/imgs.json");
    const result = await res.json();
    this.arrQuestions = paginate(result, NUMBER_QUESTIONS, index);
    this.startQuiz(this.arrQuestions);
  }

  startQuiz(arr) {
    new Question(this.element, arr);
  }
}
