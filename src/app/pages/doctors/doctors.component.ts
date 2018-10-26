import { Component, OnInit } from '@angular/core';
import { DoctorService, ModalService } from '../../services/service.index';
import { Doctor } from '../../models/doctor.model';

declare var swal;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];
  totalDoctors: number;

  from: number = 0;

  loading: boolean;

  constructor(public doctorService: DoctorService, public modalService: ModalService) { }

  ngOnInit() {

    this.loading = true;

    this.loadDoctors();

    this.modalService.notification.subscribe(resp => {

      this.loadDoctors();
    })
  }

  loadDoctors(){

    this.doctorService.loadDoctors(this.from).subscribe((resp: any) => {

      this.doctors = resp.doctors;
      this.totalDoctors = resp.total;

      this.loading = false;
    });
  }

  showModal(id: string, img: string){

    this.modalService.showModal(id, 'doctors', img);
  }

  searchDoctors(exp: string){

    if(!exp){
      this.loadDoctors();
      return;
    }

    this.loading = true;

    this.doctorService.searchDoctors(exp).subscribe((resp: any) => {
      
      this.doctors = resp.doctors;

      this.loading = false;
    });
  }

  changePage(offset: number){

    if(this.from + offset < 0){
      return;
    }

    if((this.from + offset)*5 >= this.totalDoctors){
      return;
    }

    this.from += offset;
    this.loadDoctors();
  }

  deleteDoctor(doctor: Doctor){

    swal({
      title: 'Are you sure?',
      text: 'Doctor to delete: ' + doctor.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(toDelete => {
      if (toDelete) {

        this.doctorService.deleteDoctor(doctor).subscribe(resp => {

          this.loadDoctors();
        });
      }
    });
  }

}
