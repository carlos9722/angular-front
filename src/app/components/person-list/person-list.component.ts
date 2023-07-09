import { Component, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { Person } from '../../interfaces/person';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Person[];
  displayedPersons: Person[];
  currentPage: number;
  pageSize: number;
  totalPages: number[];
  sortAscending: boolean;
  searchQuery: string;

  constructor(private personService: PersonService) {
    this.persons = [];
    this.displayedPersons = [];
    this.currentPage = 1;
    this.pageSize = 5;
    this.totalPages = [];
    this.sortAscending = true;
    this.searchQuery = '';
  }

  ngOnInit() {
    this.getPersons();
  }

  getPersons(): void {
    this.personService.getPersons().subscribe(
      res => {
        this.persons = res;
        this.calculateTotalPages();
        this.sortPersonsBySatisfactionLevel(true); // Sort initially by satisfactionLevel in ascending order
        this.paginatePersons();
      },
      err => console.log(err)
    );
  }

  calculateTotalPages(): void {
    const totalPages = Math.ceil(this.persons.length / this.pageSize);
    this.totalPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  paginatePersons(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedPersons = this.persons.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
      this.paginatePersons();
    }
  }

  sortPersonsBySatisfactionLevel(ascending: boolean): void {
    this.sortAscending = ascending;
    this.persons.sort((a, b) => {
      if (a.satisfactionLevel < b.satisfactionLevel) {
        return ascending ? -1 : 1;
      } else if (a.satisfactionLevel > b.satisfactionLevel) {
        return ascending ? 1 : -1;
      } else {
        return 0;
      }
    });

    this.paginatePersons();
  }

  sortPersonsByCategory(ascending: boolean): void {
    this.sortAscending = ascending;
    this.persons.sort((a, b) => {
      if (a.category < b.category) {
        return ascending ? -1 : 1;
      } else if (a.category > b.category) {
        return ascending ? 1 : -1;
      } else {
        return 0;
      }
    });

    this.paginatePersons();
  }

  searchPersons(): void {
    if (this.searchQuery.trim() !== '') {
      const filteredPersons = this.persons.filter(person => {
        const fullNameMatch = person.fullName.toLowerCase().includes(this.searchQuery.toLowerCase());
        const emailMatch = person.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        const areaMatch = person.area.toLowerCase().includes(this.searchQuery.toLowerCase());
        const categoryMatch = person.category.toLowerCase().includes(this.searchQuery.toLowerCase());
        const satisfactionLevelMatch = person.satisfactionLevel.toString().includes(this.searchQuery);

        return fullNameMatch || emailMatch || areaMatch || categoryMatch || satisfactionLevelMatch;
      });

      this.displayedPersons = filteredPersons;
      this.calculateTotalPages();
      this.currentPage = 1;
    } else {
      this.displayedPersons = this.persons.slice(0, this.pageSize);
      this.calculateTotalPages();
    }
  }
}
