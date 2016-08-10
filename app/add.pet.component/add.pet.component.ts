import { Component,  Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Pet } from '../pet/pet';
import { PetService } from '../pet.service/pet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
  	<div class="container">

      <div class="col-sm-6 col-sm-offset-3">

          <h1><span class="fa fa-sign-in"></span> Add pet</h1>

          <form action="/login" method="post">
              <div class="form-group">
                  <label>Name</label>
                  <input type="text" [(ngModel)]="pet.name" class="form-control" name="name">
              </div>
              <div class="form-group">
                  <label>Kind</label>
                  <input type="text" [(ngModel)]="pet.kind" class="form-control" name="kind">
              </div>
              <div class="form-group">
                  <label>Age</label>
                  <input type="text" [(ngModel)]="pet.age" class="form-control" name="age">
              </div>

              <button type="submit" (click)="addPet()" class="btnbtn-primary btn-lg">Login</button>
          </form>

          <hr>

          <p><a href="#">Back</a></p>
         

      </div>

  </div>
  `,
  providers: [
     PetService
  ]
  
})
export class AddPetComponent {
  constructor(
    private petService: PetService,
    private _router: Router,
    private route: ActivatedRoute
    ) { }

  private pet: Pet = new Pet();
  errorMessage: any;
  sub: any; 
  email: string;

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }

  addPet() {
    if (!this.pet) { return; }
    this.petService.addPet(this.email, this.pet)
          .subscribe(
            (res)  => console.log(res),
            error =>  this.errorMessage = <any>error);
  }
  
}