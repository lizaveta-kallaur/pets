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
    SignupComponent.prototype.addUser = function () {
        var _this = this;
        this.petService.addUser(this.user)
            .subscribe(function (res) {
            _this.message = res;
            if (res === "An email has been sent to you. Please check it to verify your account.") {
                _this.signup = true;
            }
        }, function (error) { return _this.errorMessage = error; });
    };
    SignupComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/signup.component/signup.component.html',
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