import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  percentage1: number = 50;
  percentage2: number = 25;

  constructor() { }

  ngOnInit() {
  }

}
