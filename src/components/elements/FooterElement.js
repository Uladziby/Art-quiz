import { BaseComponent } from "../BaseComponent";

export class Footer extends BaseComponent {
  constructor(parentElement) {
    super();
    this.parentElement = parentElement;
    this.footer = new BaseComponent(this.parentElement, "footer", [
      "footer_container",
    ]);
    this.footer.element.innerHTML = `<div class="footer_title"><b>RSSchool2021Q3</b></div>
        <a class="footer_name" href="https://github.com/Uladziby/"
          >Uladziby</a
        >

        <div class="footer_logo">
          <a href="https://rs.school/js/">
            <img
              src="./assets/rs_school_js.svg"
              alt="rsschool"
              width="100"
              height="100"
            />
          </a>
        </div>
      `;
  }
}
