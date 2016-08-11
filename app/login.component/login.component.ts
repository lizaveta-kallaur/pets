import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { PetService } from '../pet.service/pet.service';


@Component({
  selector: 'login',
  templateUrl: 'app/login.component/login.component.html',
  providers: [
     PetService
  ]
  
})
export class LoginComponent {
  constructor(
    private petService: PetService,
    private _router: Router
    ) { }

  private user: User = new User();
  errorMessage: any;
  message: any;
  
  login() {
    if (!this.user) { return; }
    this.petService.login(this.user)
          .subscribe(
            (res)  => {
              if (res == "Successful.")
                this._router.navigateByUrl('/pets');
              else this.message = res;
            },
            error =>  this.errorMessage = <any>error);
  }

  changePassword() {
    if (!this.user) { this.message = "email" }
    this.petService.changePassword(this.user)
          .subscribe(
            (res)  => {
              this.message = "Success";
            },
            error =>  this.errorMessage = <any>error);
  }
  
}