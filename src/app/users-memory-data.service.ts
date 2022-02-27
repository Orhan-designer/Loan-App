import { Injectable } from '@angular/core';
import { Users } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersMemoryDataService {
  // users = [
  //   {id: 1}
  // ];
  users: any[] = [];

  createDb() {
    return {users: this.users}
  }

  genId(users: Users[]): any {
    console.log(users);
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 0;
  }

  constructor() { }
}
