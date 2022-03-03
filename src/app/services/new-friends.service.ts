import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewFriendsService {
  private _newFriendsUrl = "http://localhost:3000/api/add-new-friend";

  constructor(private http: HttpClient) { }

  addFriend(friend) {
    return this.http.post<any>(this._newFriendsUrl, friend); //отправляем пост запрос на бэк
  };

}
