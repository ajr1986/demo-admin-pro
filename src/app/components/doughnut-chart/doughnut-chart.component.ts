import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-doughnut-chart",
  templateUrl: "./doughnut-chart.component.html",
  styles: []
})
export class DoughnutChartComponent implements OnInit {

  @Input()
  labels: string[];

  @Input()
  data: number[];

  @Input()
  type: string;

  constructor() {}

  ngOnInit() {}
}
