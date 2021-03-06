import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root',
})
export class NewFriendsService {
  constructor(private http: HttpClient) {}

  addFriend(friend) {
    return this.http.post<any>(`${environment.apiUrl}/add-new-friend`, friend);
  }
}
