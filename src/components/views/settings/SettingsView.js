import { BaseComponent } from "../../BaseComponent";
import "./settings.scss";
import volumeSVG from "../../../assets/volume-on.svg";
import timer from "../../../assets/timer_picture.svg";
import { settings } from "../pictures/constants";

export class SettingsView extends BaseComponent {
  constructor(parentElement) {
    super();
    this.store = JSON.parse(localStorage.getItem("settings"));

    this.parentElement = parentElement;
    this.container = new BaseComponent(this.parentElement.element, "div", [
      "container__settings",
    ]);
    this.head = new BaseComponent(
      this.container.element,
      "div",
      ["settings_head"],
      "",
      "settings"
    );
    this.content = new BaseComponent(this.container.element, "div", [
      "settings_content",
    ]);
    this.volume = new BaseComponent(this.content.element, "div", [
      "settings_content__volume",
    ]);
    this.volumeImg = new BaseComponent(this.volume.element, "img", [
      "settings_content__volume-img",
    ]);
    this.volumeImg.element.src = `${volumeSVG}`;
    this.volumeControl = new BaseComponent(this.volume.element, "div", [
      "settings_content__volume-control",
    ]);
    this.volumeBtn = new BaseComponent(this.volumeControl.element, "input", [
      "sound-volume",
    ]);
    this.volumeBtn.element.type = "range";
    this.volumeBtn.element.style.background = "#660033";
    this.volumeBtn.element.min = 0;
    this.volumeBtn.element.max = 100;
    this.volumeBtn.element.value = this.store.volume;
    this.volumeTitle = new BaseComponent(
      this.volume.element,
      "div",
      ["settings_content__volume-title"],
      "",
      "Volume"
    );

    this.timer = new BaseComponent(this.content.element, "div", [
      "settings_content__timer",
    ]);
    this.timerImg = new BaseComponent(this.timer.element, "img", [
      "settings_content__timer-img",
    ]);
    this.timerImg.element.src = `${timer}`;

    this.timerControl = new BaseComponent(this.timer.element, "div", [
      "settings_content__timer-control",
    ]);
    this.timerBtn = new BaseComponent(this.timerControl.element, "input", [
      "sound-volume",
    ]);
    this.timerBtn.element.type = "checkbox";
    this.timerBtn.element.checked = this.store.timer;
    this.timerTitle = new BaseComponent(
      this.timer.element,
      "div",
      ["settings_content__timer-title"],
      "",
      "timer"
    );

    this.btns = new BaseComponent(this.container.element, "div", [
      "settings_btns",
    ]);
    this.btnSave = new BaseComponent(
      this.btns.element,
      "button",
      ["settings_btns__save"],
      "",
      "save"
    );
    this.btnDefault = new BaseComponent(
      this.btns.element,
      "button",
      ["settings_btns__default"],
      "",
      "default"
    );
    this.btnSave.element.addEventListener("click", () => this.saveSettings());
  }

  saveSettings() {
    settings.volume = this.volumeBtn.element.value;
    settings.timer = this.timerBtn.element.checked;
    localStorage.setItem("settings", JSON.stringify(settings));
    location.hash = "#home";
    this.destroy();
  }

  destroy() {
    this.container.element.remove();
  }
}
