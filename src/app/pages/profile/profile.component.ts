import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  user: User;

  imageToUpload: File;
  
  imagePreviewTemp: any;

  constructor(public userService: UserService) { }

  ngOnInit() {
    this.user = this.userService.user;
  }

  save(user: User){

    this.user.name = user.name;
    if(!this.user.google){
      this.user.email = user.email;
    }

    this.userService.updateUser(this.user).subscribe();
  }

  selectImage(file){

    if(!file){
      this.imageToUpload = null;
      return;
    }

    if(file.type.indexOf('image') < 0){
      swal('Error file', 'Allowed format: png, jpg, jpeg, gif', 'error');
      this.imageToUpload = null;
      return;
    }

    this.imageToUpload = file;

    // Preview image temp
    let reader = new FileReader();
    let imageUrl = reader.readAsDataURL(file);

    reader.onloadend = () => this.imagePreviewTemp = reader.result;
  }

  changeImage(){

    this.userService.changeImage(this.imageToUpload, this.user._id);
  }

}
