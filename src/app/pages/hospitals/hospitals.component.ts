import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService, ModalService } from '../../services/service.index';

declare var swal;

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  hospitals: Hospital[] = [];
  totalHospitals: number = 0;

  from: number = 0;

  loading: boolean;

  constructor(public hospitalService: HospitalService, public modalService: ModalService) { }

  ngOnInit() {

    this.loading = true;

    this.loadHospitals();

    this.modalService.notification.subscribe(resp => {

      this.loadHospitals();
    });
  }

  loadHospitals(){

    this.hospitalService.loadHospitals(this.from).subscribe((resp: any) => {

      this.hospitals = resp.hospitals;
      this.totalHospitals = resp.total;

      this.loading = false;
    });
  }

  changePage(offset: number){

    if(this.from + offset < 0){
      return;
    }

    if((this.from + offset)*5 >= this.totalHospitals){
      return;
    }

    this.from += offset;
    this.loadHospitals();
  }

  showModal(id: string, img: string){

    this.modalService.showModal(id, 'hospitals', img);
  }

  updateHospital(hospital: Hospital){

    this.hospitalService.updateHospital(hospital).subscribe(resp => {
      console.log(resp);
    });
  }

  searchHospitals(exp: string){

    if(!exp){
      this.loadHospitals();
      return;
    }

    this.loading = true;

    this.hospitalService.searchHospitals(exp).subscribe((resp: any) => {
      
      this.hospitals = resp.hospitals;

      this.loading = false;
    });
  }

  deleteHospital(hospital: Hospital){

    swal({
      title: 'Are you sure?',
      text: 'Hospital to delete: ' + hospital.name,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(toDelete => {
      if (toDelete) {

        this.hospitalService.deleteHospital(hospital._id).subscribe(resp => {

          this.loadHospitals();
        });
      }
    });
  }

  createHospital(){

    swal({
      title: 'New hospital',
      text: 'Name:',
      content: 'input',
      buttons: ['Cancel', 'Create']
    })
    .then(hospitalName => {
      if (hospitalName) {

        this.hospitalService.createHospital(hospitalName).subscribe(resp => {
          this.loadHospitals();
        });
      }
    });
  }
  }
}
