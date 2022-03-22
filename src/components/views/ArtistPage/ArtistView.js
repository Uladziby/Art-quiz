import { BaseComponent } from '../../BaseComponent';
import './artists.scss';
import { CategoryCard } from './CategoryCard';
import { TimerElem } from './TimerElem';
import { AnswerElem } from './AnswerElem';

export class ArtistView extends BaseComponent {
    constructor(parent) {
        super(parent.element, 'div', ['artists']);
        this.artistsHead = new BaseComponent(this.element, 'div', ['artists_head']);
        this.btnHome = new BaseComponent(this.artistsHead.element, 'button', ['artists_head__btnHome'], '', 'home');
        this.btnHome.element.addEventListener('click', () => {
            location.hash = '#home';
            this.destroy();
        });
        this.titleHome = new BaseComponent(this.artistsHead.element, 'span', ['artists_head__title']);
        this.btnScore = new BaseComponent(this.artistsHead.element, 'button', ['artists_head__btnScore'], '', 'score');
        this.containerCategories = new BaseComponent(this.element, 'div', ['artists_categories']);

        this.img = null;

        this.categoryCard = null;
        this.handlerCategory = null;
        this.handlerAnswer = null;

        this.timer = null;
        this.dataGame = null;
        this.answer = null;
        this.cb = (title) => {
            this.categoryCard = title;
            this.bindSetCategory(this.handlerCategory);
        };
        this.onSetAnswer = (author) => {
            this.answer = author;
            this.bindChooseAnswer(this.handlerAnswer);
        };
    }

    displayCats(listCats) {
        listCats.map((item, index) => new CategoryCard(this.containerCategories, item, index, this.cb).getImage());
    }

    clearContainer() {
        this.containerCategories.element.innerHTML = '';
        this.timer = new TimerElem(this.element);
    }
    clearPrevQuest() {
        this.element.removeChild(this.containerImg.element);
        this.element.removeChild(this.blockAnswers.element);
    }

    displayQuestions(questions) {
        this.containerImg = new BaseComponent(this.element, 'div', ['artists_img']);
        this.img = new BaseComponent(this.containerImg.element, 'img', ['artists_img__img']);
        this.blockAnswers = new BaseComponent(this.element, 'div', ['artists_block']);
        this.textQuestion = new BaseComponent(
            this.containerImg.element,
            'span',
            ['artists_img__text'],
            '',
            'Who is an author?'
        );
        questions.map((elem) => {
            return new AnswerElem(this.blockAnswers.element, elem, this.onSetAnswer);
        });
    }

    bindSetCategory(handler) {
        this.handlerCategory = handler;
        if (this.categoryCard) {
            handler(this.categoryCard);
        }
    }
    displayImg(img) {
        this.img.element.src = `${img}`;
    }
    showCorrectAnswer(answer) {
        const ansrs = document.querySelectorAll('.artists_block__answer');
        console.log(ansrs);
        ansrs.forEach((i) => {
            if (i.textContent === this.answer) {
                i.classList.add(`${answer}`)
            }   
        });
    }

    bindChooseAnswer(handler) {
        this.handlerAnswer = handler;
        handler(this.answer);
    }
}
