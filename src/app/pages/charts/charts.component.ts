import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styles: []
})
export class ChartsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  charts: any = {
    'chart1': {
      'labels': ['label1', 'label2', 'label3'],
      'data':  [24, 30, 46],
      'type': 'doughnut',
      'title': 'title1'
    },
    'chart2': {
      'labels': ['label4', 'label5'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'title': 'title2'
    },
    'chart3': {
      'labels': ['label6', 'label7'],
      'data':  [95, 5],
      'type': 'doughnut',
      'title': 'title3'
    },
    'chart4': {
      'labels': ['label8', 'label9'],
      'data':  [85, 15],
      'type': 'doughnut',
      'title': 'title4'
    },
  };

}
