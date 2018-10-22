import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  show: boolean = false;
  notification = new EventEmitter<any>();

  type: string;
  id: string;
  img: string;

  showModal(id: string, type: string, img: string){

    this.show = true;
    this.id = id;
    this.type = type;
    this.img = img;
  }

  closeModal(){

    this.show = false;
    this.id = null;
    this.type = null;
    this.img = null;
  }

}
