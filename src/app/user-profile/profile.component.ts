import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  navigation = ['Loans', 'Contact List', 'New Loan', 'Add New Friends'];
  constructor() { }

  ngOnInit(): void {
  }

}
