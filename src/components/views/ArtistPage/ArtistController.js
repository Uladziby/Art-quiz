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
        fetchQuestions(3).then((res) => {
            this.model.dataGame = res;
            this.nextQuestions();

        });
    }
    handleAnswer(answer) {
        if (answer) {
            this.view.timer.stop();
            this.model.dataGame[this.model.currentQuestion].author === answer
                ? this.model.results.push(true)
                : this.model.results.push(false);
               
                this.view.showCorrectAnswer(this.model.results[this.model.currentQuestion])
                setTimeout(()=>{
                    this.model.currentQuestion += 1;
                    this.view.clearPrevQuest();
                    this.nextQuestions();
                },1000)
          
        }
    }

    nextQuestions() {
        this.model.arrAnswers = [];
        this.model.arrAnswers.push(this.model.dataGame[this.model.currentQuestion].author);
        this.model.createRandomAnswers().then(() => {
            this.view.displayQuestions(this.model.arrAnswers);
            this.model.fetchImage(this.model.dataGame[this.model.currentQuestion].imageNum).then((res) => {
                this.view.displayImg(res);
            });
        });
        this.view.timer.start();
        if (this.model.currentQuestion === 9) {
            console.log(this.model.results);
        }
    }
}