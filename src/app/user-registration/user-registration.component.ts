import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', [Validators.required]),
    // phone: new FormControl('')
  });

  newUser = this.userForm.value;
  submitted = false;

  onSubmit(): void {
    this.newUser = this.userForm.value;
    this.router.navigate([`/profile`])
    this.submitted = true;
    console.log(this.newUser);
  }

}