import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
  ) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  };

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        this.toastr.error('Проверьте правильность ввода пароля либо логина');
        return throwError(error);
      })
    );
  };

  loggedIn() {
    return !!JSON.parse(localStorage.getItem("token"));
  };

  getToken() {
    return localStorage.getItem('user');
  };
}
