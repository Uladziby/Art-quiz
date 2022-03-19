import { BaseComponent } from '../../BaseComponent';
import { fetchQuestions } from './api';

export class ArtistController extends BaseComponent {
    constructor(model, view) {
        super();
        this.model = model;
        this.view = view;
        this.initDisplayCategories(this.model.listCat);
        this.view.bindSetCategory(this.handleChooseCategory.bind(this));
        this.view.bindChooseAnswer(this.handleAnswer.bind(this));
    }

    initDisplayCategories(listCats) {
        this.view.displayCats(listCats);
    }
    handleChooseCategory(category) {
        this.model.setCurrentCategory(category);
        this.view.clearContainer();
        this.view.displayTimer();

        this.model.dataGame = fetchQuestions(3).then((res) => {
            console.log(res);
            const i = this.model.currentQuestion;
            this.model.arrAnswers.push(res[i].author);
            this.model.createRandomAnswers().then(() => {
                this.view.displayQuestions(this.model.arrAnswers);
                this.model.fetchImage(res[i].imageNum).then((res) => {
                    this.view.displayImg(res);
                });
            });

            //отобраить вопросы
        });

        this.model.timer = this.view.timer;
        this.model.timer.start();
    }
    handleAnswer(answer) {}
}
