import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Pet } from '../pet/pet.ts';
import { PetService } from '../pet.service/pet.service';


@Component({
  selector: 'home-page',
  templateUrl: 'app/home.page.component/home.page.component.html',
  directives: [ROUTER_DIRECTIVES],
  
})
export class HomePageComponent {
   
}