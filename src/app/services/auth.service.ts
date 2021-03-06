import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { environment } from '@environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}

  registerUser(user) {
    return this.http.post<any>(`${environment.apiUrl}/auth/signup`, user);
  }

  loginUser(user) {
    return this.http.post<any>(`${environment.apiUrl}/auth/signin`, user).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        this.toastr.error('Проверьте правильность ввода пароля либо логина');
        return throwError(error);
      })
    );
  }
}
