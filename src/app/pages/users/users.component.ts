import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService, ModalService } from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  from: number = 0;
  totalUsers: number = 0;

  loading: boolean;

  constructor(public userService: UserService, public modalService: ModalService) { }

  ngOnInit() {
    this.loadUsers();

    this.modalService.notification.subscribe(resp => {

      this.loadUsers();
    });
  }

  loadUsers(){

    this.loading = true;

    this.userService.loadUsers(this.from).subscribe((resp: any) => {

      this.totalUsers = resp.total;
      this.users = resp.users;

      this.loading = false;
    });
  }

  changePage(offset: number){

    if(this.from + offset < 0){
      return;
    }

    this.from += offset;
    this.loadUsers();
  }

  searchUsers(exp: string){

    if(!exp){
      this.loadUsers();
      return;
    }

    this.loading = true;

    this.userService.searchUsers(exp).subscribe((resp: any) => {
      
      this.totalUsers = resp.total;
      this.users = resp.users;

      this.loading = false;
    });
  }

  deleteUser(user: User){

    if(user._id == this.userService.user._id){
      swal('Error', 'Impossible delete your own user', 'error');
      return;
    }

    swal({
      title: 'Are you sure?',
      text: 'User to delete: ' + user.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(toDelete => {
      if (toDelete) {

        this.userService.deleteUser(user).subscribe(resp => {

          this.loadUsers();
        });
      }
    });
  }

  updateUser(user: User){

    this.userService.updateUser(user).subscribe();
  }

  showModal(id: string, img: string){

    this.modalService.showModal(id, 'users', img);
  }

}
