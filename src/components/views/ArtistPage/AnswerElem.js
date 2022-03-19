import { BaseComponent } from "../../BaseComponent"

export class AnswerElem extends BaseComponent{
    constructor(parent, data, onSetAnswer){
        super(parent, 'div',['artists_block-answer'],'',`${data}`)
        this.data = data;
        this.element.onclick = () => {
            onSetAnswer(this.data)
        }
    }


}