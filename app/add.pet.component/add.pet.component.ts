import { Component,  Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from '../pet/pet';
import { PetService } from '../pet.service/pet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: 'app/add.pet.component/add.pet.component.html',
  providers: [
     PetService
  ]
  
})
export class AddPetComponent {
  constructor(
    private petService: PetService,
    private _router: Router
    ) { }

  private pet: Pet = new Pet();
  errorMessage: any;
  message: any;

  addPet() {
    if (!this.pet) { return; }
    this.petService.addPet(this.pet)
          .subscribe(
            (res)  => {
              this.message = "Pet successfully added";
            },
            error =>  this.errorMessage = <any>error);
  }

  goBack() {
    window.history.back();
  }
  
}