import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewFriendsService {
  private _newFriendsUrl = "http://localhost:3000/api/add-new-friends";
  private _newFriendsUrl2 = 'http://localhost:3000/api/add-new-friends/:id'

  constructor(private http: HttpClient) { }

  getFriends(friend: {}) {
    return this.http.get<any>(this._newFriendsUrl, friend)
  }

  postFriends(friend: {}) {
    return this.http.post<any>(this._newFriendsUrl, friend);
  }

  putFriends(friend: {}) {
    return this.http.put<any>(this._newFriendsUrl, friend)
  }

  getFriendsById(friend: {}) {
    return this.http.get<any>(this._newFriendsUrl2, friend)
  }

  deleteFriends(friend: {}) {
    return this.http.delete<any>(this._newFriendsUrl2, friend)
  }

}
