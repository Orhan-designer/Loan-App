import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { Users } from '@app/users';

@Component({
  selector: 'app-pop-up',
  templateUrl: '../pop-up/pop-up.component.html',
  styleUrls: ['../pop-up/pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
  private userService: UserService) { }

  ngOnInit(): void {
  }

  pressOk() {
    this.dialogRef.close(true);
  }

  user: Users[] = [];

  addFriend() {
    this.dialogRef.close(true);
    this.userService.addUser(this.addFriend as unknown as Users)
  }

}
