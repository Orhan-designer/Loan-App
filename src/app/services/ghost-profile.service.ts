import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GhostProfileService {

  constructor(private http: HttpClient) { }
  private _newGhostFriendsUrl = "http://localhost:3000/api/add-new-friend/ghost-profile";

  addGhostProfile(ghost) {
    return this.http.post<any>(this._newGhostFriendsUrl, ghost);
    //отправляем пост запрос на бэк
  };
}
