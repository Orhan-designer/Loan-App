import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  navigation = ['Loans', 'Contact List', 'New Loan', 'Add New Friends'];

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  newUser = this.userForm.value;

  loginUser() {
    this.newUser = this.userForm.value;
    this._auth.loginUser(this.newUser)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    this.router.navigate([`/profile`]);
    console.log(this.newUser);
  }
}
