import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../users';
import { UserService } from '../user.service';
import { NewFriendsService } from '../new-friends.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-add-new-friends',
  templateUrl: './add-new-friends.component.html',
  styleUrls: ['./add-new-friends.component.css']
})
export class AddNewFriendsComponent implements OnInit {

  users: Users[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private _friendService: NewFriendsService,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private fb: FormBuilder) { }

  ngOnInit(): void {}

  newFriendForm = this.fb.group({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
  });

  addNewFriend = this.newFriendForm.value;
  model = new Users(0, '', '', '', 0);

  onSubmit(): void {
    this.addNewFriend = this.newFriendForm.value;
    this._friendService.postFriends(this.addNewFriend)
      .subscribe(
        res => this.addNewFriend = res,
        err => console.log(err)
      );
    this.router.navigate([`/contact-list`]);
    this.userService.addUser(this.addNewFriend as Users)
      .subscribe(() => {
        this.users.push(this.model);
      });
  };

  createDialog() {
    this.dialog.open(PopUpComponent, {
      data: {
        addFriend: 'A new friend has been added to your contact list'
      }
    });
  };

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  };
}
