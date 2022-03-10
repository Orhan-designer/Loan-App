import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GhostProfileService } from '@app/services/ghost-profile.service';
import { TestService } from '@app/services/test.service';
import { ToastrService } from 'ngx-toastr';
// import { Users } from '@app/users';

@Component({
  selector: 'app-pop-up',
  templateUrl: '../pop-up/pop-up.component.html',
  styleUrls: ['../pop-up/pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private testService: TestService,
    private _ghost: GhostProfileService,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void { }

  pressOk() {
    this.dialogRef.close(true);
  };

  newEmailForm = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email])
  })


  addNewGhostFriend = this.newEmailForm.value;

  newGhostFriend() {
    this.addNewGhostFriend = this.newEmailForm.value;
    this.addNewGhostFriend = JSON.parse(localStorage.getItem('user'))._id;
    this._ghost.addGhostProfile(this.addNewGhostFriend).subscribe(
      res => {
        console.log(res)
        this.toastr.success('Контакт успешно создан!');
      },
      err => {
        console.log(err);
      }
    );
    this.dialogRef.close(true);
  };
}
