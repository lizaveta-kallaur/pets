import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { PetService } from '../pet.service/pet.service';

@Component({
  selector: 'registration',
  template: `
    <div class="container" >

      <div class="col-sm-6 col-sm-offset-3">

          <h1 *ngIf="!signup"><span *ngIf="!signup" class="fa fa-sign-in"></span> Signup</h1>

          <!-- LOGIN FORM -->
          <form action="/signup" method="post" *ngIf="!signup">
              <div class="form-group">
                  <label>Email</label>
                  <input type="text" [(ngModel)]="user.email" class="form-control" name="email">
              </div>
               <div class="form-group">
                  <label>Full name</label>
                  <input type="text" [(ngModel)]="user.fullname" class="form-control" name="fullname">
              </div>
               <div class="form-group">
                  <label>Age</label>
                  <input type="text" [(ngModel)]="user.age" class="form-control" name="age">
              </div>
              <div class="form-group">
                  <label>Password</label>
                  <input type="password" [(ngModel)]="user.password" class="form-control" name="password">
              </div>

              <button type="submit" (click)="save()" class="btn-primary btn-lg">Signup</button>
          </form>
          
          <h1 *ngIf="signup">Please, confirm your email</h1>

          <hr>
          
          <p>Already have an account? <a href="/login">Login</a></p>
          <p>Or go <a href="/">home</a>.</p>

      </div>

    </div>

  `,
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
  errorMessage: any;
  private user: User = new User();
  
  save() {
    if (!this.user) { return; }
    this.petService.save(this.user)
          .subscribe(
            ()  => this.signup = true,
            error =>  this.errorMessage = <any>error);
  }
}

