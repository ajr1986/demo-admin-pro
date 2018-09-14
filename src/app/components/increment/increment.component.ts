import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-increment",
  templateUrl: "./increment.component.html",
  styles: []
})
export class IncrementComponent implements OnInit {
  @ViewChild("percentageInput")
  percentageInput: ElementRef;

  @Input()
  label: string = "label";

  @Input()
  percentage: number = 50;

  @Output()
  changeValueEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {}

  changeValueInput(value) {
    if (value > 100) {
      this.percentage = 100;
    } else if (value < 0) {
      this.percentage = 0;
    } else if (value == null) {
      this.percentage = 0;
    } else {
      this.percentage = value;
    }

    this.percentageInput.nativeElement.value = this.percentage;

    this.changeValueEmitter.emit(this.percentage);
    this.percentageInput.nativeElement.focus();
  }

  changeValue(value) {
    if (this.percentage + value >= 100) {
      this.percentage = 100;
    } else if (this.percentage + value <= 0) {
      this.percentage = 0;
    } else {
      this.percentage += value;
    }

    this.changeValueEmitter.emit(this.percentage);
    this.percentageInput.nativeElement.focus();
  }
}
