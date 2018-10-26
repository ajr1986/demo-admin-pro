import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  title: string;

  constructor(private router: Router, private appTitle: Title) { 

    this.getRouteData().subscribe(data => {

      this.title = data;
      appTitle.setTitle(`AdminPro - ${this.title}`);
    })
  }

  ngOnInit() {
  }

  getRouteData(){

    return this.router.events.pipe(
     
      filter( event => event instanceof ActivationEnd),
      filter( (event: ActivationEnd) => event.snapshot.firstChild == null),
      map( (event: ActivationEnd) => event.snapshot.data.title)
    );
  }

}
