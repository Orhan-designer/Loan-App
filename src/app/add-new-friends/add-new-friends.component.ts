import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-new-friends',
  templateUrl: './add-new-friends.component.html',
  styleUrls: ['./add-new-friends.component.css']
})
export class AddNewFriendsComponent implements OnInit {
  users: Users[] = []

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  newFriendForm = new FormGroup({
    fullName: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl(''),
    gender: new FormControl('')
  })

  addNewFriend = this.newFriendForm.value;
  submitted = false;
  model = new Users(0, '', '', '', '', 0, '')

  gender = ['Male', 'Female']

  onSubmit(): void {
    this.addNewFriend = this.newFriendForm.value;
    this.router.navigate([`/contact-list`])
    this.submitted = true;
    this.userService.addUser(this.addNewFriend as Users)
    .subscribe(() => {
      this.users.push(this.model)
    })
    console.log(this.addNewFriend);
    console.log(this.users);
  }

}
