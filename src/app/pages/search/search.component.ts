import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/service.index';
import { User } from '../../models/user.model';
import { Hospital } from '../../models/hospital.model';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  hospitals: Hospital[] = [];
  doctors: Doctor[] = [];

  constructor(public activatedRoute: ActivatedRoute, public searchService: SearchService) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      console.log(params['exp']);

      this.searchService.search(params['exp']).subscribe((resp: any) => {

        this.users = resp.users;
        this.hospitals = resp.hospitals;
        this.doctors = resp.doctors;
      })
    });
  }

}
