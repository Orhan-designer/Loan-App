import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoanServiceService {
  constructor(private http: HttpClient) {}

  createLoan(loan) {
    return this.http.post<any>(`${environment.apiUrl}/new-credit`, loan);
  }

  repay(loan) {
    return this.http.post<any>(`${environment.apiUrl}/repay`, loan);
  }
}
