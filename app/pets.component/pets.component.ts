import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet/pet';
import { PetService} from '../pet.service/pet.service';
import { ActivatedRoute } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';

const PETS: Pet[] = [
	{ name : 'Кити', kind : 'кот', age : 4},
	{ name : 'Кити', kind : 'кот', age : 4},
	{ name : 'Кити', kind : 'кот', age : 4},
	{ name : 'Кити', kind : 'кот', age : 4}
];

@Component({
  selector: 'pets',
  templateUrl: 'app/pets.component/pets.component.html',
  providers: [
    PetService
  ],
  directives: [ROUTER_DIRECTIVES]
})
export class PetsComponent implements OnInit{
  pets = PETS;
  pets2 : Pet[];
  errorMessage: any;
  sub: any;
  email: string;
  constructor(private petService: PetService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.email = params['email'];
      this.petService.getPets(this.email)
        .subscribe(
          pets => this.pets2 = pets,
          error =>  this.errorMessage = <any>error);
    });
  }
}