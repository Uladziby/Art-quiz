import { BaseComponent } from '../../BaseComponent';
import { getImage } from '../../../api/api';
import { shuffleAnswers } from '../pictures/commonFunc';
import { getRandomAuthor } from '../../../api/api';
import { Popup } from '../popup/popupElement';
import timerImg from '../../../assets/timer_picture.svg';
import { Timer } from '../../elements/Timer';

const TIME_BETWEEN_QUESTIONS = 5000;

export class Question {
    constructor(parentElem, objRightAnsw) {
        this.indexCurrentQuestion = 0;
        const { author, name, year, imageNum } = objRightAnsw[this.indexCurrentQuestion];
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
        this.options = { cb: this.nextQuestion.bind(this) };
        this.popup = new Popup(this.appElem, this.options);
        this.popup.dataQuestion = this.objRightAnsw[this.indexCurrentQuestion];
        this.btnHome = document.querySelector('.pictures_head__btnHome');

        //Timer
        this.timerContainer = new BaseComponent(this.parentElem, 'div', ['questions__timer']);
        this.settingsTimer = JSON.parse(localStorage.getItem('settings'));
        this.settingsTimer.timer
            ? (this.timerContainer.element.style.display = 'flex')
            : (this.timerContainer.element.style.display = 'none');
        this.timerImg = new BaseComponent(this.timerContainer.element, 'img', ['questions__timer_img']);
        this.timerImg.element.src = `${timerImg}`;
        this.timerNum = new BaseComponent(this.timerContainer.element, 'div', ['questions__timer_time']);
        this.Timer = new Timer(this.timerNum.element);
        this.Timer.stop.bind(this);

        this.containerImg = new BaseComponent(this.parentElem, 'div', ['questions_img']);
        this.img = new BaseComponent(this.containerImg.element, 'img', ['questions_img__img']);
        this.blockAnswers = new BaseComponent(this.parentElem, 'div', ['questions_block']);

        this.nextQuestion();
    }

    nextQuestion() {
        window.addEventListener('change',()=>{
            
        })
        if(location.hash!=='#pictures'){
            this.Timer.stop();
            this.destroy();
            this.popup.destroy();
        }
        if (this.indexCurrentQuestion === 10 ) {
            this.Timer.stop();
            alert(`your result is ${localStorage.getItem('scoreRound')}/10`);
            document.querySelector('.cover').remove();
            location.hash = '#home';
        } else {
            this.img.element.innerHTML = '';
            this.blockAnswers.element.innerHTML = '';
            this.imageNum = this.objRightAnsw[this.indexCurrentQuestion].imageNum;

            if (this.settingsTimer.timer) {
                this.Timer.start(this.objRightAnsw[this.indexCurrentQuestion], this.options);
            }
            this.setImage();
            this.setAnswers();
            this.indexCurrentQuestion++;
        }
    }

    async setImage() {
        try {
            this.img.element.src = `${await getImage(this.imageNum)}`;
        } catch (error) {
            console.log(error, 'setImage');
        }
    }

    async setAnswers() {
        try {
            this.arrAnswers.length = 0;
            this.arrAnswers.push(this.objRightAnsw[this.indexCurrentQuestion].author);
            await this.createRandomAnswers();
            this.arrAnswers.map((item) => {
                let elem = new BaseComponent(
                    this.blockAnswers.element,
                    'div',
                    ['questions_block__answer'],
                    '',
                    `${item}`
                );
                elem.element.addEventListener('click', (e) => {
                    this.checkAnswer(e.target);
                    this.Timer.stop();
                });
            });
        } catch (error) {
            console.log(error, 'setanswers');
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
        if (targetElem === this.objRightAnsw[this.indexCurrentQuestion - 1].author) {
            element.classList.add('truth');
            this.status = true;
            this.numOfTruth++;
            localStorage.setItem('scoreRound', this.numOfTruth);
        } else {
            element.classList.add('lie');
            this.status = false;
        }
        setTimeout(() => {
            if (this.indexCurrentQuestion < this.objRightAnsw.length) {
                this.popup.init();
                this.popup.show();

                /*         new Popup(this.options, this.status);
                 */
            }
        }, TIME_BETWEEN_QUESTIONS);
    }
    showPopup() {
        this.activePopup(true);
        this.popup.dataQuestion = this.objRightAnsw[this.indexCurrentQuestion];

        this.popup.init();
        this.popup.show();
    }

    destroy() {
        this.parentElem.destroy();
    }
}
