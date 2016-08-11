import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { PetService } from '../pet.service/pet.service';

@Component({
  templateUrl: 'app/signup.component/signup.component.html',
  providers: [
     PetService
  ]
  
})
export class SignupComponent {
  constructor(
    private petService: PetService,
    private _router: Router
  ) { }

  signup = false;
  message: any;
  errorMessage: any;
  private user: User = new User();
  
  addUser() {
    this.petService.addUser(this.user)
          .subscribe(
            (res)  =>{
              this.message = res;
              if (res === "An email has been sent to you. Please check it to verify your account.") {
                this.signup = true;
              }
            },
            error =>  this.errorMessage = <any>error);
  }
}

