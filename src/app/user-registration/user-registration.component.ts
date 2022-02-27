import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { TranslateService } from '@ngx-translate/core';

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
  ) { }

  ngOnInit(): void { }

  userForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')]),
    password: new FormControl('', [Validators.required])
  })

  newUser = this.userForm.value;

  registerUser() {
    this.newUser = this.userForm.value;
    this._auth.registerUser(this.newUser)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    this.router.navigate([`/contact-list`])
    console.log(this.newUser);
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