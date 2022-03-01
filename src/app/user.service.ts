import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Users } from './users';
import { UsersMemoryDataService } from './users-memory-data.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private usersData: UsersMemoryDataService,
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getUser(id: any): Observable<any> {
    return of(this.usersData.users.find(u => u.id === id));
  }

  addUser(user: Users) {
    user.id = this.usersData.users.length + 1; //добавляем пользователей начиная с айди номер 1
    this.usersData.users.push(user);
    return of(user);
  }

  // deleteUser(id: Users) {
  //   const url = `${this.friendService}/${id}`;

  //   return this.http.delete<Users>(url, this.httpOptions).pipe(
  //     tap(_ => this.log(`deleted friend id=${id}`)),
  //     catchError(this.handleError<Users>('deletedFriend'))
  //   );

  // };

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     this.log(`${operation} failed: ${error.message}`);
  //     return of(result as T)
  //   };
  // };

  // private log(message: string) {
  //   this.messageService.add(`HeroService: ${message}`);
  // };
}
