import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Pet } from '../pet/pet.ts';
import { PetService } from '../pet.service/pet.service';


@Component({
  selector: 'my-app',
  template: `
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES],
  
})
export class AppComponent {
  
  
}