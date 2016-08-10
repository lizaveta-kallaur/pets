import { provideRouter, RouterConfig }  from '@angular/router';
import { SignupComponent } from '../signup.component/signup.component';
import { LoginComponent } from '../login.component/login.component';
import { AppComponent } from '../app.component/app.component';
import { PetsComponent } from '../pets.component/pets.component';
import { HomePageComponent } from '../home.page.component/home.page.component';
import { AddPetComponent } from '../add.pet.component/add.pet.component'

const routes: RouterConfig = [
  	{
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
    	path:'',
    	component: HomePageComponent
    },
    {
    	path: ':email',
    	component: PetsComponent
    },
    {
        path: ':email/addpet',
        component: AddPetComponent
    },
];

export const appRouterProviders = [
  provideRouter(routes)
];
