import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet/pet';
import { PetService} from '../pet.service/pet.service';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  templateUrl: 'app/pets.component/pets.component.html',
  providers: [
    PetService
  ],
  directives: [ROUTER_DIRECTIVES]
})
export class PetsComponent implements OnInit{
  pets : Pet[];
  errorMessage: any;
  sub: any;
  editPet: Pet;
  message: any;
  oldPet: Pet;
  searchName: string;
  foundPets = [];
  deletePets = [];
  checked = [];

  constructor(
    private petService: PetService
  ) { }

  ngOnInit() {
     this.petService.getPets()
      .subscribe(
        pets => {
          this.pets = pets;
          this.pets.forEach((pet) => {
             this.checked.push({
               name: pet.name,
               kind: pet.kind,
               age: pet.age,
               checked: false
             })
          })
        },
        error =>  this.errorMessage = <any>error);
    
  }

  edit(pet) {
    this.editPet = pet;
    this.oldPet = {
      name: pet.name,
      kind: pet.kind,
      age: pet.age
    };
  }

  saveChanges() {
    if (!this.editPet) { return; }
    this.petService.saveChanges(this.editPet, this.oldPet)
          .subscribe(
            (res)  => {
              this.message = "Pet successfully changed";
              this.petService.getPets()
                .subscribe(
                  pets => {
                    this.pets = pets;
                  },
                  error =>  this.errorMessage = <any>error);
            },
            error =>  this.errorMessage = <any>error);
  }

  search() {
    if(this.foundPets) {
      this.foundPets = []
    }
    this.pets.forEach((pet)=>{
      if (pet.name == this.searchName)
         this.foundPets.push(pet);
    })
  }

  check(pet) {
    this.checked.map((elem) => {
      if (elem.name == pet.name) {
         if (elem.checked) 
           elem.checked = false;
         else
           elem.checked = true;
      }
      return elem;
    })
    console.log(this.checked)
  }

  delete() {
    let pets = this.checked.filter(pet => pet.checked);
    console.log(pets);
    if (pets) {
       this.petService.delete(pets)
          .subscribe(
            (res)  => {
              this.message = "Pet successfully deleted";
              this.petService.getPets()
                .subscribe(
                  pets => {
                    this.pets = pets;
                  },
                  error =>  this.errorMessage = <any>error);
            },
            error =>  this.errorMessage = <any>error);
    }
    
  }

  logout() {
    this.petService.logout()
                .subscribe(
                  res => {
                    console.log(res);
                  },
                  error =>  this.errorMessage = <any>error);
  }
}