import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'TecSeg';
  mostrarMenu: boolean = true;
  mosrtrarLogin: boolean = true;



  constructor( private router: Router ) {


  }

   ngOnInit(){

   }

}


