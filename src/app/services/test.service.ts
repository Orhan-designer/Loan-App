import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  constructor(private http: HttpClient) { }

  private serverUrl = "http://localhost:3000/api/";

  user: any = {};

  loansList: any[] = [];

  usersList: any[] = [];

  get loans() {
    return this.loansList;
  };

  get users() {
    return this.usersList;
  };

  get userInfo() {
    return this.user;
  };

  addLoan(loan: any): void {
    this.loansList.push(loan); //call api post
  };

  setUser(user: any) {
    this.user = user;
  };

  getFriends(id: string, value) {
    return this.http.post<any>(this.serverUrl + 'friends/' + id, { searchValue: value });
  };

  getUsers() {
    return this.http.get<any>(this.serverUrl + 'users/list');
  };

  getLoans(id) {
    return this.http.get<any>(this.serverUrl + 'loans/' + id);
  };

  getFilteredLoans(data) {
    return this.http.post<any>(this.serverUrl + 'loans/user', data);
  };
}
