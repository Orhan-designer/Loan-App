import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up',
  templateUrl: '../pop-up/pop-up.component.html',
  styleUrls: ['../pop-up/pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PopUpComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  pressOk() {
    this.dialogRef.close(true);
  }

}
