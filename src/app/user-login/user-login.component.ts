import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TestService } from '../services/test.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: '../user-login/user-login.component.html',
  styleUrls: ['../user-login/user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private testService: TestService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this._auth.loggedIn()) {
      this.router.navigate(['contact-list']);
    }
  }

  userForm = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$'
      ),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  newUser = this.userForm.value;

  loginUser() {
    this.newUser = this.userForm.value;
    this._auth.loginUser(this.newUser).subscribe(
      (res) => {
        this.testService.setUser(res.values.user);
        localStorage.setItem('user', JSON.stringify(res.values.user));
        localStorage.setItem('token', JSON.stringify(res.values.token));
        this.router.navigate(['/contact-list']);
        this.toastr.success('Вы успешно вошли в систему!');
      },
      (err) => console.log(err)
    );
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }
}
