"use strict";
var router_1 = require('@angular/router');
var signup_component_1 = require('../signup.component/signup.component');
var login_component_1 = require('../login.component/login.component');
var pets_component_1 = require('../pets.component/pets.component');
var home_page_component_1 = require('../home.page.component/home.page.component');
var add_pet_component_1 = require('../add.pet.component/add.pet.component');
var routes = [
    {
        path: 'signup',
        component: signup_component_1.SignupComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: '',
        component: home_page_component_1.HomePageComponent
    },
    {
        path: 'pets',
        component: pets_component_1.PetsComponent
    },
    {
        path: 'addpet',
        component: add_pet_component_1.AddPetComponent
    },
];
exports.appRouterProviders = [
    router_1.provideRouter(routes)
];
//# sourceMappingURL=app.routes.js.map