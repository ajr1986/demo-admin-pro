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
  menu: any = null;

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

      this.saveLocalStorage(resp.id, resp.token, resp.user, resp.menu);
      return true;
    }));
  }

  loginGoogle(token: string){

    let url = URL_SERVICES + '/login/google';

    return this.httpClient.post(url, {token: token}).pipe(map((resp: any) => {

      this.saveLocalStorage(resp.id, resp.token, resp.user, resp.menu);
      return true;
    }));
  }

  isLogedin(){
    
    return this.token ? true : false;
  }

  logout(){

    this.user = null;
    this.token = null;
    this.menu = null;

    localStorage.removeItem('id');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  saveLocalStorage(id: string, token: string, user: User, menu: any){

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.user = user;
    this.token = token;
    this.menu = menu;
  }

  loadLocalStorage(){

    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = null;
      this.user = null;
      this.menu = null;
    }
  }

  createUser(user: User){
    
    let url = URL_SERVICES + '/user';

    return this.httpClient.post(url, user);
  }

  updateUser(user: User){

    let url = `${URL_SERVICES}/user/${user._id}?token=${this.token}`;

    return this.httpClient.put(url, user).pipe(map((resp: any) => {

      if(this.user._id == resp.user._id){
        this.saveLocalStorage(resp.user._id, this.token, resp.user, this.menu);
      }

      swal('User updated', resp.user.name, 'success');

      return true;
    }));
  }

  changeImage(file: File, id: string){

    this.uploadService.uploadFile(file, 'users', id)
      .then( (resp: any) => {

        this.user.img = resp.users.img;
        this.saveLocalStorage(id, this.token, this.user, this.menu);
        swal('Image updated', this.user.name, 'success');

      })
      .catch( resp => {

        console.log(resp);
      });
  }

  loadUsers(from: number = 0){

    let url = `${URL_SERVICES}/user?p=${from}`;

    return this.httpClient.get(url);
  }

  searchUsers(exp: string){

    let url = `${URL_SERVICES}/search/users/${exp}`;

    return this.httpClient.get(url);
  }

  deleteUser(user: User){

    let url = `${URL_SERVICES}/user/${user._id}?token=${this.token}`;
    
    return this.httpClient.delete(url).pipe(map(resp => {

      swal('User deleted', user.name, 'success');
      return true;
    }));
  }
}
