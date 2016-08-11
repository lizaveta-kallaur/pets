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
var pet_service_1 = require('../pet.service/pet.service');
var router_1 = require('@angular/router');
var PetsComponent = (function () {
    function PetsComponent(petService) {
        this.petService = petService;
        this.foundPets = [];
        this.deletePets = [];
        this.checked = [];
    }
    PetsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.petService.getPets()
            .subscribe(function (pets) {
            _this.pets = pets;
            _this.pets.forEach(function (pet) {
                _this.checked.push({
                    name: pet.name,
                    kind: pet.kind,
                    age: pet.age,
                    checked: false
                });
            });
        }, function (error) { return _this.errorMessage = error; });
    };
    PetsComponent.prototype.edit = function (pet) {
        this.editPet = pet;
        this.oldPet = {
            name: pet.name,
            kind: pet.kind,
            age: pet.age
        };
    };
    PetsComponent.prototype.saveChanges = function () {
        var _this = this;
        if (!this.editPet) {
            return;
        }
        this.petService.saveChanges(this.editPet, this.oldPet)
            .subscribe(function (res) {
            _this.message = "Pet successfully changed";
            _this.petService.getPets()
                .subscribe(function (pets) {
                _this.pets = pets;
            }, function (error) { return _this.errorMessage = error; });
        }, function (error) { return _this.errorMessage = error; });
    };
    PetsComponent.prototype.search = function () {
        var _this = this;
        if (this.foundPets) {
            this.foundPets = [];
        }
        this.pets.forEach(function (pet) {
            if (pet.name == _this.searchName)
                _this.foundPets.push(pet);
        });
    };
    PetsComponent.prototype.check = function (pet) {
        this.checked.map(function (elem) {
            if (elem.name == pet.name) {
                if (elem.checked)
                    elem.checked = false;
                else
                    elem.checked = true;
            }
            return elem;
        });
        console.log(this.checked);
    };
    PetsComponent.prototype.delete = function () {
        var _this = this;
        var pets = this.checked.filter(function (pet) { return pet.checked; });
        console.log(pets);
        if (pets) {
            this.petService.delete(pets)
                .subscribe(function (res) {
                _this.message = "Pet successfully deleted";
                _this.petService.getPets()
                    .subscribe(function (pets) {
                    _this.pets = pets;
                }, function (error) { return _this.errorMessage = error; });
            }, function (error) { return _this.errorMessage = error; });
        }
    };
    PetsComponent.prototype.logout = function () {
        var _this = this;
        this.petService.logout()
            .subscribe(function (res) {
            console.log(res);
        }, function (error) { return _this.errorMessage = error; });
    };
    PetsComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/pets.component/pets.component.html',
            providers: [
                pet_service_1.PetService
            ],
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [pet_service_1.PetService])
    ], PetsComponent);
    return PetsComponent;
}());
exports.PetsComponent = PetsComponent;
//# sourceMappingURL=pets.component.js.map