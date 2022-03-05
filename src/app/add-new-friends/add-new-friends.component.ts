import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../users';
import { NewFriendsService } from '../services/new-friends.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '@app/services/user.service';
@Component({
  selector: 'app-add-new-friends',
  templateUrl: '../add-new-friends/add-new-friends.component.html',
  styleUrls: ['../add-new-friends/add-new-friends.component.css']
})
export class AddNewFriendsComponent implements OnInit {

  users: Users[] = [];

  constructor(
    private router: Router,
    private _friendService: NewFriendsService,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void { }

  newFriendForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$')]),
  });

  addNewFriend = this.newFriendForm.value;
  model = new Users('');

  onSubmit(): void {
    this.addNewFriend = this.newFriendForm.value;
    this.addNewFriend.id = JSON.parse(localStorage.getItem('user'))._id;
    this._friendService.addFriend(this.addNewFriend).subscribe((res) => {
      console.log(res)
      this.toastr.success('Друг добавлен!');
      this.router.navigate(['/contact-list']);
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
