import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { PersonService } from 'src/app/services/person.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  person: Person = {
    fullName: '',
    date: new Date(),
    email: '',
    area: '',
    category: '',
    company: ['', ''],
    satisfactionLevel: 0
  };
  edit: boolean = false;

  constructor(
    private personService: PersonService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.personService.getPerson(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.person = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  submitPerson() {
    this.personService.createPerson(this.person)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        },
        err => console.log(err)
      )
  }

 
}