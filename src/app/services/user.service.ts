import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Users } from '../users';
import { UsersMemoryDataService } from './users-memory-data.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private usersData: UsersMemoryDataService) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getUser(id: any): Observable<any> {
    return of(this.usersData.users.find((u: any) => u.id === id));
  }

  addUser(user: Users) {
    this.usersData.users.push(user);
    return of(user);
  }
}
