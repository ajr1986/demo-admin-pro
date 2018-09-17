import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 

    this.subscription = this.countTo(3).pipe(
      retry(2)
    ).
    subscribe(
      next => console.log(next),
      error => console.error(error),
      () => console.log("Finish")
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  countTo(value: number){

    return new Observable(
      observer => {

        let counter = 0;

        let interval = setInterval( () => {

          counter++;
          observer.next(counter);

          if(counter == value){

            observer.complete();
            clearInterval(interval);
          }

          if(counter == value-1){

            observer.error('Something was wrong');
            // clearInterval(interval);
          }

        }, 1000);
    });
  }

}
