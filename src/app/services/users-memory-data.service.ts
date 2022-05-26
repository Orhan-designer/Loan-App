import { Injectable } from '@angular/core';
import { Users } from '../users';

@Injectable({
  providedIn: 'root',
})
export class UsersMemoryDataService {
  users: any;

  createDb() {
    return { users: this.users };
  }

  constructor() {}
}
