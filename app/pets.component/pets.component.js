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
var router_2 = require('@angular/router');
var PETS = [
    { name: 'Кити', kind: 'кот', age: 4 },
    { name: 'Кити', kind: 'кот', age: 4 },
    { name: 'Кити', kind: 'кот', age: 4 },
    { name: 'Кити', kind: 'кот', age: 4 }
];
var PetsComponent = (function () {
    function PetsComponent(petService, route) {
        this.petService = petService;
        this.route = route;
        this.pets = PETS;
    }
    PetsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.email = params['email'];
            _this.petService.getPets(_this.email)
                .subscribe(function (pets) { return _this.pets2 = pets; }, function (error) { return _this.errorMessage = error; });
        });
    };
    PetsComponent = __decorate([
        core_1.Component({
            selector: 'pets',
            templateUrl: 'app/pets.component/pets.component.html',
            providers: [
                pet_service_1.PetService
            ],
            directives: [router_2.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [pet_service_1.PetService, router_1.ActivatedRoute])
    ], PetsComponent);
    return PetsComponent;
}());
exports.PetsComponent = PetsComponent;
//# sourceMappingURL=pets.component.js.map