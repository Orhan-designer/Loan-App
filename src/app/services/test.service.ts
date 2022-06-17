import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  private serverUrl = `${environment.apiUrl}/`;

  user: any;
  loansList: any[] = [];

  /* функция отвечает за то, что по id основного пользователя
  отображает пользователей в contact-list и пользоваталей должников в loans-list */
  get userInfo() {
    return this.user;
  }
  /* эта функция показывает, что когда у пользователя беруд в долг, отображается id 
  именно того пользователя у которого взяли. То есть, если зайти под другим пользователем, 
  то будет показываться его id, если потом зайти ещё под другим, то будет отображаться его id, 
  и кредит будет открывать на его id*/
  addLoan(loan: any) {
    this.loansList.push(loan); //call api post
  }

  setUser(user: any) {
    this.user = user;
  }

  getFriends(id: string, value: any) {
    return this.http.post<any>(this.serverUrl + 'friends/' + id, {
      searchValue: value,
    });
  }

  getUsers() {
    return this.http.get<any>(this.serverUrl + 'users/list');
  }

  getLoans(id, userId?) {
    return this.http.get<any>(
      this.serverUrl + 'loans/' + id + (userId ? `?id=${userId}` : '')
    );
  }

  getFilteredLoans(data) {
    return this.http.post<any>(this.serverUrl + 'loans/user', data);
  }
}
