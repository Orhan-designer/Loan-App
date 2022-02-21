import { Injectable } from '@angular/core';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersMemoryDataService {
  users = [
    {id: 1}
  ];

  createDb() {
    return {users: this.users}
  }

  genId(users: Users[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 0;
  }

  constructor() { }
}
