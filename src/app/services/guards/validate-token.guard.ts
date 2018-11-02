import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateTokenGuard implements CanActivate {
  
  constructor(public userService: UserService, public router: Router){}
  
  canActivate(): Promise<boolean> | boolean {

    let token = this.userService.token;

    if(!token){
      
      this.router.navigate(['/login']);
      return false;
    }

    let payload = JSON.parse(atob(token.split('.')[1]));

    if(this.isExpired(payload.exp)){

      this.router.navigate(['/login']);
      return false;
    }

    return this.needRenewToken(payload.exp);
  }

  isExpired(time){

    let now = new Date().getTime() / 1000;

    return time <= now;
  }

  needRenewToken(expirationTime: number) {

    return new Promise<boolean>((resolve, reject) => {

      let now = new Date().getTime() / 1000;

      if(now + (20 * 60) >= expirationTime){
        // if 20 minutos or less to expire, renew token
        this.userService.renewToken().subscribe(resp => {
          
          resolve(true);
        }, () => {

          resolve(false);
        });

      } else {
        resolve(true);
      }
    });
  }
}
