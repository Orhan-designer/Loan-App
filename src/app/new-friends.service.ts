import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewFriendsService {
  private _newFriendsUrl = "http://localhost:3000/api/add-new-friends";
  private _newFriendsUrl2 = 'http://localhost:3000/api/add-new-friends/:id'

  constructor(private http: HttpClient) { }

  postFriends(friend: {}) {
    return this.http.post<any>(this._newFriendsUrl, friend); //отправляем пост запрос на бэк
  };

  getFriendsById(friend: {}) {
    return this.http.get<any>(this._newFriendsUrl2, friend); //получаем друзей с бэка по id
  };

  putFriends(friend: {}) {
    return this.http.put<any>(this._newFriendsUrl, friend); //обновляем данные друзей в бэк
  };

  deleteFriendsById(friend: {}) {
    return this.http.delete<any>(this._newFriendsUrl2, friend); //удаляем друга из бэка по id
  };

}
