export class Timer {
  constructor(parentElement, counter = 5) {
    this.counter = counter;
    this.parentElement = parentElement;
  }
  start() {
    this.interval = setInterval(() => {
       if(this.counter>=0){
        this.minutes = Math.floor(this.counter / 60);
        this.sec = this.counter % 60;
        this.parentElement.innerHTML = `${this.minutes < 10 ? `0${this.minutes}` : `${this.minutes}`}:${
          this.sec < 10 ? `0${this.sec}` : `${this.sec}`
        }`;
        this.counter--;
       }else return 
    }, 1000);
  }
  stop(){

  }
  restart(){
      clearInterval(this.interval)
  }
}
