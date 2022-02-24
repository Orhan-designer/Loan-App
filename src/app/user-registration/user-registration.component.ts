import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private router: Router, private _auth: AuthService) { }

  ngOnInit(): void { }

  navigation = ['Loans', 'Contact List', 'New Loan', 'Add New Friends'];

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', [Validators.required]),
  });

  newUser = this.userForm.value;

  registerUser() {
    this.newUser = this.userForm.value;
    this._auth.registerUser(this.newUser)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )
    this.router.navigate([`/profile`])
    console.log(this.newUser);
  }

}