import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { TestService } from '../services/test.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {
  hasHeader: boolean = true;

  constructor(
    private router: Router,
    private _auth: AuthService,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private testService: TestService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  userForm = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$'
      ),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  newUser = this.userForm.value;

  registerUser() {
    this.newUser = this.userForm.value;
    this._auth.registerUser(this.newUser).subscribe(
      (res) => {
        this.testService.setUser(res.values.user);
        localStorage.setItem('user', JSON.stringify(res.values.user));
        localStorage.setItem('token', JSON.stringify(res.values.token));
        this.router.navigate(['/contact-list']);
        this.toastr.success('Вы успешно зарегистрировались!');
      },
      (err) => console.log('Error: ', err)
    );
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }
}
