import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoanServiceService {
  private _newLoansUrl = "http://localhost:3000/api/new-credit";

  constructor(private http: HttpClient) { }

  createLoan(loan: {}) {
    return this.http.post<any>(this._newLoansUrl, loan);
  }

}
