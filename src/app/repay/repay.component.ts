import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanServiceService } from '@app/services/loan.service';

@Component({
  selector: 'app-repay',
  templateUrl: './repay.component.html',
  styleUrls: ['./repay.component.css'],
})
export class RepayComponent implements OnInit {
  sum: any;

  constructor(
    private loanService: LoanServiceService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<RepayComponent>
  ) {}

  ngOnInit(): void {}

  forRepay() {
    this.loanService.repay({ id: this.data, sum: this.sum }).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
