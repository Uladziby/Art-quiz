import { arrCategories } from "../pictures/constants";
import { getRandomAuthor } from "../../../api/api";
import { shuffleAnswers } from "../pictures/commonFunc";
import { getImage } from "../../../api/api";

export class ArtistModel{

    constructor(){
        this.listCat = arrCategories;
        this.currentCategory = null;
        this.results = [];
        this.dataGame = null;
        this.timer = null;
        this.arrAnswers = [];
        this.currentQuestion = 0;

    }
    setCurrentCategory(category){
       this.currentCategory=this.listCat.filter(i=> i===category);
       console.log(this.currentCategory, 'model')
    }
    async createRandomAnswers() {
        while (this.arrAnswers.length < 4) {
            this.arrAnswers.push(await getRandomAuthor());
        }
        shuffleAnswers(this.arrAnswers);
    }

    async fetchImage(number) {
        try {
            return `${await getImage(number)}`;
        } catch (error) {
            console.log(error, 'setImage');
        }
    }
}
//add listcats in view from model, next realize method chooseCategory