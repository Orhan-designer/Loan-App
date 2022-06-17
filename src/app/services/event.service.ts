import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  createEvent(event) {
    console.log(event)
    return this.http.post<any>(`${environment.apiUrl}/accounting-group-debts`, event);
  }
}
