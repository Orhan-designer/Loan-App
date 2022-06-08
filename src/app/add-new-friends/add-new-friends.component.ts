import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewFriendsService } from '../services/new-friends.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-friends',
  templateUrl: '../add-new-friends/add-new-friends.component.html',
  styleUrls: ['../add-new-friends/add-new-friends.component.css'],
})
export class AddNewFriendsComponent implements OnInit {
  constructor(
    private router: Router,
    private _friendService: NewFriendsService,
    private translateService: TranslateService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  id: any;

  ngOnInit(): void {}

  newFriendForm = this.fb.group({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern(
        '^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$'
      ),
    ]),
  });

  addNewFriend = this.newFriendForm.value;

  onSubmit(): void {
    this.addNewFriend = this.newFriendForm.value;
    this.addNewFriend.id = JSON.parse(localStorage.getItem('user')).id; // достаём из localstorage id основого пользователя
    this._friendService.addFriend(this.addNewFriend).subscribe((res) => {
      this.addNewFriend = JSON.parse(
        JSON.stringify(localStorage.getItem(res.values))
      );
      this.toastr.success('Пользователь успешно добавлен!');
      this.router.navigate(['/contact-list']);
    });
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }
}
