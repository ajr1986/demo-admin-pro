import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SettingsService {

settings: Settings = {
  theme: 'default',
  themeUrl: 'assets/css/colors/default.css'
};

  constructor() {
    this.loadSettings();
  }

  saveSettings(){

    localStorage.setItem('settings', JSON.stringify(this.settings));
  }

  loadSettings(){

    if(localStorage.getItem('settings')){

      this.settings = JSON.parse(localStorage.getItem('settings'));
      this.changeTheme(this.settings.theme);
    }
  }

  changeTheme(theme: string){

    let url = `assets/css/colors/${theme}.css`;
    document.getElementById("theme").setAttribute("href", url);

    this.settings.theme = theme;
    this.settings.themeUrl = url;

    this.saveSettings();
  }
}

interface Settings {
  theme: string;
  themeUrl: string;
}
