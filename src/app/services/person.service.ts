import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Person } from '../interfaces/person';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPersons(): Observable<Person[]>{
    const result = this.http.get<Person[]>(`${this.BASE_URL}/person`)
    console.log(result)
    return this.http.get<Person[]>(`${this.BASE_URL}/person`);
  }

  getPerson(id: number): Observable<Person>{
    return this.http.get<Person>(`${this.BASE_URL}/person/${id}`);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.BASE_URL}/person/create`, person);
  }


}
