import { Component, OnInit } from "@angular/core";
import { SettingsService } from "../../services/service.index";

@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  
  constructor(public settingsService: SettingsService) {}

  ngOnInit() {
    this.markSelectedTheme();
  }

  changeTheme(theme: string, themeId: any) {

    let selectors: any = document.getElementsByClassName("selector");

    // Remove the current selected mark
    for(let selector of selectors){
      selector.classList.remove('working');
    }

    // set the clicked theme as selected.
    themeId.classList.add('working');

    this.settingsService.changeTheme(theme);
  }

  markSelectedTheme(){

    let selectors: any = document.getElementsByClassName("selector");

    let theme = this.settingsService.settings.theme;

    for(let selector of selectors){
      if(selector.getAttribute('data-theme') == theme){
        selector.classList.add('working');
        break;
      }
      
    }
  }
}
