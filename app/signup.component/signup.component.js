"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var user_1 = require('../user/user');
var pet_service_1 = require('../pet.service/pet.service');
var SignupComponent = (function () {
    function SignupComponent(petService, _router) {
        this.petService = petService;
        this._router = _router;
        this.signup = false;
        this.user = new user_1.User();
    }
    SignupComponent.prototype.save = function () {
        var _this = this;
        if (!this.user) {
            return;
        }
        this.petService.save(this.user)
            .subscribe(function () { return _this.signup = true; }, function (error) { return _this.errorMessage = error; });
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'registration',
            template: "\n    <div class=\"container\" >\n\n      <div class=\"col-sm-6 col-sm-offset-3\">\n\n          <h1 *ngIf=\"!signup\"><span *ngIf=\"!signup\" class=\"fa fa-sign-in\"></span> Signup</h1>\n\n          <!-- LOGIN FORM -->\n          <form action=\"/signup\" method=\"post\" *ngIf=\"!signup\">\n              <div class=\"form-group\">\n                  <label>Email</label>\n                  <input type=\"text\" [(ngModel)]=\"user.email\" class=\"form-control\" name=\"email\">\n              </div>\n               <div class=\"form-group\">\n                  <label>Full name</label>\n                  <input type=\"text\" [(ngModel)]=\"user.fullname\" class=\"form-control\" name=\"fullname\">\n              </div>\n               <div class=\"form-group\">\n                  <label>Age</label>\n                  <input type=\"text\" [(ngModel)]=\"user.age\" class=\"form-control\" name=\"age\">\n              </div>\n              <div class=\"form-group\">\n                  <label>Password</label>\n                  <input type=\"password\" [(ngModel)]=\"user.password\" class=\"form-control\" name=\"password\">\n              </div>\n\n              <button type=\"submit\" (click)=\"save()\" class=\"btn-primary btn-lg\">Signup</button>\n          </form>\n          \n          <h1 *ngIf=\"signup\">Please, confirm your email</h1>\n\n          <hr>\n          \n          <p>Already have an account? <a href=\"/login\">Login</a></p>\n          <p>Or go <a href=\"/\">home</a>.</p>\n\n      </div>\n\n    </div>\n\n  ",
            providers: [
                pet_service_1.PetService
            ]
        }), 
        __metadata('design:paramtypes', [pet_service_1.PetService, router_1.Router])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map