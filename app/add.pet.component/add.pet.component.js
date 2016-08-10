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
var pet_1 = require('../pet/pet');
var pet_service_1 = require('../pet.service/pet.service');
var router_2 = require('@angular/router');
var AddPetComponent = (function () {
    function AddPetComponent(petService, _router, route) {
        this.petService = petService;
        this._router = _router;
        this.route = route;
        this.pet = new pet_1.Pet();
    }
    AddPetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.email = params['email'];
        });
    };
    AddPetComponent.prototype.addPet = function () {
        var _this = this;
        if (!this.pet) {
            return;
        }
        this.petService.addPet(this.email, this.pet)
            .subscribe(function (res) { return console.log(res); }, function (error) { return _this.errorMessage = error; });
    };
    AddPetComponent = __decorate([
        core_1.Component({
            template: "\n  \t<div class=\"container\">\n\n      <div class=\"col-sm-6 col-sm-offset-3\">\n\n          <h1><span class=\"fa fa-sign-in\"></span> Add pet</h1>\n\n          <form action=\"/login\" method=\"post\">\n              <div class=\"form-group\">\n                  <label>Name</label>\n                  <input type=\"text\" [(ngModel)]=\"pet.name\" class=\"form-control\" name=\"name\">\n              </div>\n              <div class=\"form-group\">\n                  <label>Kind</label>\n                  <input type=\"text\" [(ngModel)]=\"pet.kind\" class=\"form-control\" name=\"kind\">\n              </div>\n              <div class=\"form-group\">\n                  <label>Age</label>\n                  <input type=\"text\" [(ngModel)]=\"pet.age\" class=\"form-control\" name=\"age\">\n              </div>\n\n              <button type=\"submit\" (click)=\"addPet()\" class=\"btnbtn-primary btn-lg\">Login</button>\n          </form>\n\n          <hr>\n\n          <p><a href=\"#\">Back</a></p>\n         \n\n      </div>\n\n  </div>\n  ",
            providers: [
                pet_service_1.PetService
            ]
        }), 
        __metadata('design:paramtypes', [pet_service_1.PetService, router_1.Router, router_2.ActivatedRoute])
    ], AddPetComponent);
    return AddPetComponent;
}());
exports.AddPetComponent = AddPetComponent;
//# sourceMappingURL=add.pet.component.js.map