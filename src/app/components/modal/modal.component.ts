import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UploadService, ModalService } from 'src/app/services/service.index';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})
export class ModalComponent implements OnInit {

  imageToUpload: File;
  imagePreviewTemp: any;

  constructor(public modalService: ModalService, public uploadService: UploadService) { }

  ngOnInit() {
    
  }

  closeModal(){

    this.imageToUpload = null;
    this.imagePreviewTemp = null;

    this.modalService.closeModal();
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

    this.uploadService.uploadFile(this.imageToUpload, this.modalService.type, this.modalService.id)
      .then( (resp: any) => {

        this.modalService.notification.emit(resp);
        this.closeModal();

      })
      .catch( resp => {

        console.log(resp);
      });
  }

}
