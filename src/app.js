import { ContentElement } from "./components/elements/ContentElement";
import { Footer } from "./components/elements/FooterElement";
import { HeaderElement } from "./components/elements/HeaderElement";
import { settings } from "./components/views/pictures/constants";
import "./styles.scss";

class App {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.header = new HeaderElement(this.parentNode);
    this.content = new ContentElement(this.parentNode);
    this.footer = new Footer(this.parentNode);
    localStorage.setItem("settings", JSON.stringify(settings));
    localStorage.setItem("scoreRound", 0);
  }
}
export default App;
