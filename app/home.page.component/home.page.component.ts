import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Pet } from '../pet/pet.ts';
import { PetService } from '../pet.service/pet.service';


@Component({
  selector: 'home-page',
  template: `
    <div class="jumbotron text-center">
            <h1><span class="fa fa-lock"></span> Node Authentication</h1>

            <p>Login or Register with:</p>

            <a href="#" [routerLink]="['/login']" class="btn btn-primary btn-lg"><span class="fa fa-user"></span> Local Login</a>
            <a href="#" [routerLink]="['/signup']" class="btn btn-primary btn-lg"><span class="fa fa-user"></span> Local Signup</a>
     </div>
     
  `,
  directives: [ROUTER_DIRECTIVES],
  
})
export class HomePageComponent {
  
  
}