import { BaseComponent } from "../../BaseComponent";
import timerImg from "../../../assets/timer_picture.svg"

export class TimerElem extends BaseComponent{
    constructor(parent){
        super(parent,'div', ['artists__timer'] )
        this.settingsTimer = JSON.parse(localStorage.getItem('settings'));
        this.settingsTimer.timer
            ? (this.element.style.display = 'flex')
            : (this.element.style.display = 'none');
        this.timerImg = new BaseComponent(this.element, 'img', ['artists__timer_img']);
        this.timerImg.element.src = `${timerImg}`;
        this.timerNum = new BaseComponent(this.element, 'div', ['artists__timer_time']);
        this.initialCounter = 60;
    }
    start() {
       
        this.interval = setInterval(() => {
          if (this.initialCounter >= 0) {
            this.minutes = Math.floor(this.initialCounter / 60);
            this.sec = this.initialCounter % 60;
            this.timerNum.element.innerHTML = `${
              this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`
            }:${this.sec < 10 ? `0${this.sec}` : `${this.sec}`}`;
            this.initialCounter--;
          } else {
            this.stop();
          }
        }, 1000);
      }
    
      stop() {
        clearInterval(this.interval);
        this.initialCounter = 60;
      }
}

//create timer and display it , display view in method start game