import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Users } from './users';
import { UsersMemoryDataService } from './users-memory-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private usersData: UsersMemoryDataService, private http: HttpClient,) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUser(id: any): Observable<any> {
    return of(this.usersData.users.find(u => u === u));
  }

  addUser(user: any): Observable<Users[]> {
    user.id = this.usersData.users[this.usersData.users.length - 1].id + 1;
    this.usersData.users.push(user);
    return of(user);
  }
}
