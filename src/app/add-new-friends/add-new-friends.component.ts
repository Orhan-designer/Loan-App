import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../users';
import { UserService } from '../user.service';
import { NewFriendsService } from '../new-friends.service';

@Component({
  selector: 'app-add-new-friends',
  templateUrl: './add-new-friends.component.html',
  styleUrls: ['./add-new-friends.component.css']
})
export class AddNewFriendsComponent implements OnInit {
  navigation = ['Loans', 'Contact List', 'New Loan', 'Add New Friends'];

  users: Users[] = [];
  constructor(private router: Router, private userService: UserService,
    private _friendService: NewFriendsService) { }

  ngOnInit(): void {
  }

  newFriendForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl('')
  });

  addNewFriend = this.newFriendForm.value;
  model = new Users(0, '', '', '', '', 0, '');

  gender = ['Male', 'Female'];

  onSubmit(): void {
    this.addNewFriend = this.newFriendForm.value;
    this._friendService.getFriends(this.addNewFriend)
      .subscribe(
        res => this.addNewFriend = res,
        err => console.log(err)
      );
    this.router.navigate([`/contact-list`]);
    this.userService.addUser(this.addNewFriend as Users)
      .subscribe(() => {
        this.users.push(this.model);
      });

    console.log(this.addNewFriend);
    console.log(this.users);
  }

}
