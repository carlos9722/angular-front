import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';

import { Person } from '../../interfaces/person'

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {

  constructor(private personService: PersonService) {
    this.persons = [];
   }

  persons: Person[];

  ngOnInit() {
    this.getPersons();
  }

  getPersons(): void {
    this.personService.getPersons()
      .subscribe(
        res => this.persons = res,
        err => console.log(err)
      )
  }



}
