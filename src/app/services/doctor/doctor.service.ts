import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { Doctor } from '../../models/doctor.model';
import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(public httpClient: HttpClient, public userService: UserService) { }

  loadDoctors(from: number = 0){

    let url = `${URL_SERVICES}/doctor?p=${from}`;

    return this.httpClient.get(url);
  }

  loadDoctor(id: string){

    let url = `${URL_SERVICES}/doctor/${id}`;

    return this.httpClient.get(url);
  }

  searchDoctors(exp: string){

    let url = `${URL_SERVICES}/search/doctors/${exp}`;

    return this.httpClient.get(url);
  }

  deleteDoctor(doctor: Doctor){

    let url = `${URL_SERVICES}/doctor/${doctor._id}?token=${this.userService.token}`;

    return this.httpClient.delete(url).pipe(map((resp: any) => {

      swal('Doctor deleted', resp.doctor.name, 'success');
    }));
  }

  saveDoctor(doctor: Doctor){

    if(doctor._id){
      // Update
      return this.updateDoctor(doctor);

    } else {
      // Create
      return this.createDoctor(doctor);
    }
  }

  createDoctor(doctor: Doctor){

    let url = `${URL_SERVICES}/doctor?token=${this.userService.token}`;

    return this.httpClient.post(url, doctor).pipe(map((resp: any) => {

      swal('Doctor created', resp.doctor.name, 'success');
      return resp;
    }));
  }

  updateDoctor(doctor: Doctor){

    let url = `${URL_SERVICES}/doctor/${doctor._id}?token=${this.userService.token}`;

    return this.httpClient.put(url, doctor).pipe(map((resp: any) => {

      swal('Doctor updated', resp.doctor.name, 'success');
      return resp;
    }));
  }
}
