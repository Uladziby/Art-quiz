import { BaseComponent } from "../BaseComponent";
import logo from '../../assets/logo.svg'

export class HeaderElement extends BaseComponent{
    constructor(parentElement){
        super()
        this.parentElement = parentElement;
        this.header = new BaseComponent(this.parentElement,'header', ['header_container']);
        this.header_logo = new BaseComponent(this.header.element, 'img',[ 'header_logo']);
        this.header_logo.element.src = logo;
    }

}