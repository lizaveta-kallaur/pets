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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Observable_1 = require('rxjs/Observable');
require('../rxjs-operators/rxjs-operators');
var PetService = (function () {
    function PetService(http) {
        this.http = http;
    }
    PetService.prototype.getPets = function (email) {
        return this.http.get("http://localhost:2000/" + email)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PetService.prototype.addPet = function (email, pet) {
        var body = JSON.stringify(pet);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:2000/${email}/addpet', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PetService.prototype.save = function (user) {
        var body = JSON.stringify(user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:2000/signup', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PetService.prototype.login = function (user) {
        var body = JSON.stringify(user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('http://localhost:2000/login', body, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    PetService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body.data || {};
    };
    PetService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable_1.Observable.throw(errMsg);
    };
    PetService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PetService);
    return PetService;
}());
exports.PetService = PetService;
//# sourceMappingURL=pet.service.js.map