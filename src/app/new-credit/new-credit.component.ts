import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.css']
})
export class NewCreditComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  newCreditForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl(''),
    howMuch: new FormControl(''),
    date: new FormControl(''),
    reason: new FormControl(''),
    gender: new FormControl('')
  })

  addNewCredit = this.newCreditForm.value;
  submitted = false;

  gender = ['Male', 'Female'];

  onSubmit(): void {
    this.addNewCredit = this.newCreditForm.value;
    this.router.navigate([`/loans`])
    this.submitted = true;
    console.log(this.addNewCredit)
  }

}
