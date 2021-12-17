class QuizElement {
  constructor() {
    this.popup = new PopupELement();
  }

  nextQuestion() {
      
  }
}

class PopupELement {
  constructor() {
    const parent = document.querySelector(".app");
    this.btnNext = new BaseComponent(this.popupElement.element,
         "button", ["popup_btnNext"], "", "next");
    this.btnNext.element.addEventListener("click", () => {
      this.hide();
    });
  }
}
