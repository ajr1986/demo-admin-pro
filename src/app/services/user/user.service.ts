import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadService } from '../upload/upload.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;
  token: string;

  constructor(public httpClient: HttpClient, public router: Router, public uploadService: UploadService) { 
    this.loadLocalStorage();
  }

  login(user: User, remember: boolean ){

    if(remember){

      localStorage.setItem('email', user.email);

    } else {

      localStorage.removeItem('email');
    }

    let url = URL_SERVICES + '/login';

    return this.httpClient.post(url, user).pipe(map((resp: any) => {

      this.saveLocalStorage(resp.id, resp.token, resp.user);
      return true;
    }));
  }

  loginGoogle(token: string){

    let url = URL_SERVICES + '/login/google';

    return this.httpClient.post(url, {token: token}).pipe(map((resp: any) => {

      this.saveLocalStorage(resp.id, resp.token, resp.user);
      return true;
    }));
  }

  isLogedin(){
    
    return this.token ? true : false;
  }

  logout(){

    this.user = null;
    this.token = null;

    localStorage.removeItem('id');
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  saveLocalStorage(id: string, token: string, user: User){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.user = user;
    this.token = token;
  }

  loadLocalStorage(){

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }

  createUser(user: User){
    
    let url = URL_SERVICES + '/user';

    return this.httpClient.post(url, user);
  }

  updateUser(user: User){

    let url = `${URL_SERVICES}/user/${user._id}?token=${this.token}`;

    return this.httpClient.put(url, user).pipe(map((resp: any) => {

      this.saveLocalStorage(resp.user._id, this.token, resp.user);
      swal('User updated', this.user.name, 'success');

      return true;
    }));
  }

  changeImage(file: File, id: string){

    this.uploadService.uploadFile(file, 'users', id)
      .then( (resp: any) => {

        console.log(resp);
        this.user.img = resp.users.img;
        this.saveLocalStorage(id, this.token, this.user);
        swal('Image updated', this.user.name, 'success');

      })
      .catch( resp => {

        console.log(resp);
      });
  }
}
