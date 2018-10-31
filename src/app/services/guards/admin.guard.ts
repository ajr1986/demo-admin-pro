import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(public userService: UserService, public router: Router){

  }

  canActivate() {

    if(this.userService.user.role == 'ADMIN_ROLE'){
      
      return true;

    } else {

      this.router.navigate(['/login']);
      return false;
    }

  }
}
