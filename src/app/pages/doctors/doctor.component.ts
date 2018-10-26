import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Hospital } from "../../models/hospital.model";
import { HospitalService, DoctorService, ModalService } from "../../services/service.index";
import { Doctor } from "../../models/doctor.model";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-doctor",
  templateUrl: "./doctor.component.html",
  styles: []
})
export class DoctorComponent implements OnInit {
  hospitals: Hospital[] = [];

  doctor: Doctor = new Doctor("", "", "", "", "");

  hospital: Hospital = new Hospital("");

  constructor(
    public hospitalService: HospitalService,
    public doctorService: DoctorService,
    public router: Router,
    public activateRoute: ActivatedRoute,
    public modalService: ModalService
  ) {}

  ngOnInit() {
    
    this.hospitalService.loadHospitals().subscribe((resp: any) => {
      this.hospitals = resp.hospitals;
    });

    this.loadDoctor();

    this.modalService.notification.subscribe(resp => {
      this.doctor.img = resp.doctors.img;
    });
  }

  loadDoctor(){

    this.activateRoute.params.subscribe(param => {
      let id = param["id"];
      if (id != "new") {
        this.doctorService.loadDoctor(id).subscribe((resp: any) => {
          this.doctor = resp.doctor;
          this.doctor.hospital = resp.doctor.hospital._id;
          this.changeHospital(this.doctor.hospital);
        });
      }
    });
  }

  saveDoctor(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.doctorService.saveDoctor(this.doctor).subscribe((resp: any) => {
      this.doctor = resp.doctor;

      this.router.navigate(["/doctor", resp.doctor._id]);
    });
  }

  changeHospital(id) {
    for (let hospital of this.hospitals) {
      if (hospital._id == id) {
        this.hospital = hospital;
        break;
      }
    }
  }

  showModal(id: string, img: string){

    this.modalService.showModal(id, 'doctors', img);
  }
}
