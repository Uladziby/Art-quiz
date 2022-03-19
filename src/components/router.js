import { HomeView } from "./views/home/HomeView";
import { PicturesView } from "./views/pictures/PicturesView";
import { SettingsView } from "../components/views/settings/SettingsView";
import { ArtistController } from "./views/ArtistPage/ArtistController";
import { ArtistModel } from "./views/ArtistPage/ArtistModel";
import { ArtistView } from "./views/ArtistPage/ArtistView";


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
          return new ArtistController(new ArtistModel(), new ArtistView(this.parentElement));
        },
      },
    ];
  }

  updateLocation(path) {
    const currentRoute = this.routes.find((elem) => elem.name === path);
    return currentRoute.component();
  }
}
