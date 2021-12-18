import { HomeView } from "./views/home/HomeView";
import { PicturesView } from "./views/pictures/PicturesView";
import { SettingsView } from "../components/views/settings/SettingsView";

export class Router {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.routes = [
      {
        name: "#home",
        component: () => {
          return new HomeView(this.parentElement);
        },
      },
      {
        name: "#settings",
        component: () => {
          return new SettingsView(this.parentElement);
        },
      },
      {
        name: "#pictures",
        component: () => {
          return new PicturesView(this.parentElement);
        },
      },
      {
        name: "#artists",
        component: () => {
          return new SettingsView(this.parentElement);
        },
      },
      /*  {
        name: "#questions",
        component: () => {
          return new QuestionsView(this.parentElement);
        },
      }, */
    ];
  }

  updateLocation(path) {
    const currentRoute = this.routes.find((elem) => elem.name === path);
    return currentRoute.component();
  }
}
