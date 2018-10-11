import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/service.index';
import { User } from '../models/user.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  remember: boolean = false;
  email: string;

  auth2: any;

  constructor( public router: Router, public userService: UserService) { }

  ngOnInit() {
    init_plugins();

    this.googleInit();

    let emailRemember = localStorage.getItem('email');
    if(emailRemember){
      this.email = emailRemember;
      this.remember = true;
    }
  }

  googleInit(){

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '314748335521-35d7nug87q7s6umenikpuer270sq8232.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ){

    this.auth2.attachClickHandler(element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      
      this.userService.loginGoogle(token).subscribe(resp => {

        // this.router.navigate(['/']);
        window.location.href = '#/';
      });
    });
  }

  login(form: NgForm){

    console.log(form.valid);
    console.log(form.value);

    if(!form.valid){
      return;
    }

    let user = new User(null, form.value.email, form.value.password);

    this.userService.login(user, this.remember).subscribe(resp => {

      this.router.navigate(['/']);
    });

  }

}
