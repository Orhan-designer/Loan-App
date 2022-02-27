import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(
    private _auth: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {}

  userForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')]),
    password: new FormControl('', [Validators.required]),
  });

  newUser = this.userForm.value;

  loginUser() {
    this.newUser = this.userForm.value;
    this._auth.loginUser(this.newUser)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    this.router.navigate([`/contact-list`]);
  };

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  };
}
