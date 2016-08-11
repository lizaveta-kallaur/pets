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
var AddPetComponent = (function () {
    function AddPetComponent(petService, _router) {
        this.petService = petService;
        this._router = _router;
        this.pet = new pet_1.Pet();
    }
    AddPetComponent.prototype.addPet = function () {
        var _this = this;
        if (!this.pet) {
            return;
        }
        this.petService.addPet(this.pet)
            .subscribe(function (res) {
            _this.message = "Pet successfully added";
        }, function (error) { return _this.errorMessage = error; });
    };
    AddPetComponent.prototype.goBack = function () {
        window.history.back();
    };
    AddPetComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/add.pet.component/add.pet.component.html',
            providers: [
                pet_service_1.PetService
            ]
        }), 
        __metadata('design:paramtypes', [pet_service_1.PetService, router_1.Router])
    ], AddPetComponent);
    return AddPetComponent;
}());
exports.AddPetComponent = AddPetComponent;
//# sourceMappingURL=add.pet.component.js.map