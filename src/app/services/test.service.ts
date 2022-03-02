import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private serverUrl = "http://localhost:3000/api/";

  loansList: any[] = [
    { loanName: 'Test', firstPerson: { name: 'Andrey', id: 1 }, secondPerson: { name: 'Andrey', id: 1 }, howMuch: '50', reason: 'party', date: '11/10/2022' },
    { loanName: 'loan', firstPerson: { name: 'Andrey', id: 1 }, secondPerson: { name: 'Orhan', id: 2 }, howMuch: '150', reason: 'home', date: '12/10/2022' }
  ];

  user: any = {};

  usersList: any[] = [
    { name: 'Andrey', id: 1 },
    { name: 'Orhan', id: 2 },
    { name: 'Valeh', id: 3 },
    { name: 'Dima', id: 4 },
    { name: 'Nikita', id: 5 },
  ];

  get loans() {
    return this.loansList;
  }

  get users() {
    return this.usersList;
  }

  get userInfo() {
    return this.user;
  }

  constructor(private http: HttpClient) { }

  addLoan(loan: any): void {
    this.loansList.push(loan); //call api post
  }

  setUser(user: any) {
    console.log(user)
    this.user = user;
  }

  getFriends(id: string) {
    return this.http.get<any>(this.serverUrl + 'friends/' + id)
    //коллекция юзеров
    //твой профиль-друзья
    //фильтруешь
  }

  getUsers() {
    return this.http.get<any>(this.serverUrl + 'users/list');
  }

  getLoans(id) {
    return this.http.get<any>(this.serverUrl + 'loans/' + id);
  }

  getFilteredLoans(data) {
    return this.http.post<any>(this.serverUrl + 'loans/user', data);
  }
}
