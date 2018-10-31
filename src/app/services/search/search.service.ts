import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(public httpClient: HttpClient) { }

  search(exp: string){

    let url = `${URL_SERVICES}/search/all/${exp}`;

    return this.httpClient.get(url);
  }
}
