import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewFriendsService {
  private _newFriendsUrl = "http://localhost:3000/api/add-new-friends";

  constructor(private http: HttpClient) { }

  getFriends(friend: {}) {
    return this.http.post<any>(this._newFriendsUrl, friend);
  }
}
