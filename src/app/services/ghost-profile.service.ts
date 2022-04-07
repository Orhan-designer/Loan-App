import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GhostProfileService {

  constructor(private http: HttpClient) { }
  addGhostProfile(ghost) {
    return this.http.post<any>(`${environment.apiUrl}/add-new-friend/ghost-profile`, ghost);
  };
}
