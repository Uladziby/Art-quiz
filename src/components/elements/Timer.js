import { Popup } from "../views/popup/popupElement";

const TIME_ROUND = 10;

export class Timer {
  constructor(parentElement, counter = TIME_ROUND) {
    this.counter = counter;
    this.parentElement = parentElement;
    this.data = [];
    this.options = function () {};
  }
  start(data, options) {
    this.data = data;
    this.options = options;
    this.interval = setInterval(() => {
      if (this.counter >= 0) {
        this.minutes = Math.floor(this.counter / 60);
        this.sec = this.counter % 60;
        this.parentElement.innerHTML = `${
          this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`
        }:${this.sec < 10 ? `0${this.sec}` : `${this.sec}`}`;
        this.counter--;
      } else {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.interval);
    this.counter = TIME_ROUND;
    this.popup = new Popup(this.options);
    this.popup.dataQuestion = this.data;
    this.popup.init();
    this.popup.show();
  }
}
