import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() { 

    this.countTo(5).then(
      (msg) => console.log("Finish", msg)
    ).catch(
      (msg) => console.error("Finish", msg)
    )
    
  }

  ngOnInit() {
  }

  countTo(value: number){

    return new Promise( (resolve, reject) => {

      let counter = 0;

      let interval = setInterval(() => {

        counter++;
        console.log(counter);

        if(counter == value){
          
          resolve("OK");
          clearInterval(interval);
        }

      }, 1000);

    });
  }

}
