import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { PetService } from '../pet.service/pet.service';


@Component({
  selector: 'authorization',
  template: `
  	<div class="container">

      <div class="col-sm-6 col-sm-offset-3">

          <h1><span class="fa fa-sign-in"></span> Login</h1>

          <!-- LOGIN FORM -->
          <form action="/login" method="post">
              <div class="form-group">
                  <label>Email</label>
                  <input type="text" [(ngModel)]="user.email" class="form-control" name="email">
              </div>
              <div class="form-group">
                  <label>Password</label>
                  <input type="password" [(ngModel)]="user.password" class="form-control" name="password">
              </div>

              <button type="submit" (click)="login()" class="btn-primary btn-lg">Login</button>
          </form>

          <hr>

          <p>Need an account? <a href="/signup">Signup</a></p>
          <p>Or go <a href="/">home</a>.</p>

      </div>

  </div>
  `,
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
  
  login() {
    if (!this.user) { return; }
    this.petService.login(this.user)
          .subscribe(
            ()  => this._router.navigateByUrl(this.user.email),
            error =>  this.errorMessage = <any>error);
  }
  
}