import { BaseComponent } from "../../BaseComponent";
import { ImageElement } from "../../ImageElement";
import "./card.scss";
import { paginate } from "../../views/pictures/commonFunc";
import { arrCategories, RANDOM_PAGE } from "../../views/pictures/constants";
import '../../../inputDate/imgs.json'
import { QuestionsView } from "../../views/questions/QuestionsView";

export class CardElement extends BaseComponent {
  constructor(parentElement, title, index, picturesHead) {
    super(parentElement.element, "div", ["card","cardAnime"]);
    this.title = title;
    this.index = index++;
    
    this.cardBlock = new BaseComponent(this.element,'div',['card_block']);
    this.numberCategory = new BaseComponent(this.cardBlock.element, 'span',['card_block__number'],'',`${index}`);
    this.cardScore = new BaseComponent(this.cardBlock.element,'div',['card_block__score'],'','0/10') 
    this.cardTitle = new BaseComponent(this.cardBlock.element,'span',['card_block__title'],'', `${this.title}`);
    //TODO create class for images
    this.cardImage = new Image(184, 184);
    this.getImage();
    this.element.appendChild(this.cardImage);
    
    this.element.addEventListener('click',()=> new QuestionsView(parentElement,this.index))
  }

  deleteCard(){
    this.element.remove()
  }

  async getNameImageCategories() {
    const arrImagesCategories = [];
    const res = await fetch("../../../inputDate/imgs.json");
    const result = await res.json();
    const arrCat = paginate(result, arrCategories.length, RANDOM_PAGE);
    arrCat.map((elem) => arrImagesCategories.push(parseInt(elem.imageNum)+1));
    return arrImagesCategories;
  }

  async getImage() {
    const arrImgsCat = await this.getNameImageCategories();
    const numImgs = await arrImgsCat[this.index];
    const resp = await fetch(`../../../inputDate/img/${numImgs}.jpg`);
    this.cardImage.src = resp.url;
  }
}
