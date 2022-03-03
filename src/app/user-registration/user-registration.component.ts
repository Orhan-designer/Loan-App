import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { TranslateService } from '@ngx-translate/core';
import { TestService } from '../services/test.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  hasHeader: boolean = true;

  constructor(
    private router: Router,
    private _auth: AuthService,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private testService: TestService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    if(this._auth.loggedIn()) {
      this.router.navigate(['contact-list']);
    }
   }

  userForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')]),
    password: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    isGhost: false
  })

  newUser = this.userForm.value;

  registerUser() {
    this.newUser = this.userForm.value;
    this._auth.registerUser(this.newUser)
      .subscribe(
        res => {
          console.log(res);
          this.testService.setUser(res);
          localStorage.setItem('user', JSON.stringify(res.user));
          localStorage.setItem('token', JSON.stringify(res.token));
          this.router.navigate(['/contact-list']);
          this.toastr.success('Вы успешно зарегистрировались!');
          // this.createDialog();
        },
        err => console.log(err)
      )
  }

  createDialog() {
    this.dialog.open(PopUpComponent, {
      data: {
        register: 'You register successfully'
      }
    });
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value)
  }
}
