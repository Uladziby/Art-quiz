import { paginate } from "../pictures/commonFunc";
import { NUMBER_QUESTIONS } from "../pictures/constants";

export async function fetchQuestions(index) {
    const res = await fetch("../../../inputDate/imgs.json");
    const result = await res.json();
    const arrQuestions = paginate(result, NUMBER_QUESTIONS, index);
    return arrQuestions
  }