import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user/user.service';
import { Hospital } from '../../models/hospital.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(public httpClient: HttpClient, public userService: UserService) { }

  loadHospitals(from: number = 0){

    let url = `${URL_SERVICES}/hospital?p=${from}`;

    return this.httpClient.get(url);
  }

  getHospital(id: string){

    let url = `${URL_SERVICES}/hospital/${id}`;

    return this.httpClient.get(url);
  }

  deleteHospital(id: string){

    let url = `${URL_SERVICES}/hospital/${id}?token=${this.userService.token}`;

    return this.httpClient.delete(url).pipe(
      map((resp: any) => {
        swal('Hospital deleted', resp.hospital.name, 'success');
      }));
  }

  createHospital(name: string){

    let url = `${URL_SERVICES}/hospital?token=${this.userService.token}`;

    return this.httpClient.post(url, {name: name}).pipe(map((resp: any) => {

      swal('Hospital created', resp.hospitals.name, 'success');
    }));
  }

  searchHospitals(exp: string){

    let url = `${URL_SERVICES}/search/hospitals/${exp}`;

    return this.httpClient.get(url);
  }

  updateHospital(hospital: Hospital){

    let url = `${URL_SERVICES}/hospital/${hospital._id}?token=${this.userService.token}`;

    return this.httpClient.put(url, hospital).pipe(map((resp: any) => {

      swal('Hospital updated', resp.hospital.name, 'success');
    }));
  }

}
