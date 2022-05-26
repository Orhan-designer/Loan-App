import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { RepayComponent } from '@app/repay/repay.component';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent implements OnInit {
  constructor(
    private testService: TestService,
    private translateService: TranslateService,
    private dialog: MatDialog
  ) {}

  isLoansLoaded: boolean = false;
  panelOpenState = false;
  loans: any[] = [];
  users: any[] = [];
  id: string;
  color = '#fafa77';

  ngOnInit(): void {
    if (this.testService.userInfo) { //удалил отсюда id, но может понадобится вернуть его
      this.id = this.testService.userInfo; // и отсюда удалил
    } else {
      this.id = JSON.parse(JSON.stringify(localStorage.getItem('user')));
    }
    this.getLoans();
  }

  selectUser(user: any) {
    this.isLoansLoaded = false;
    this.testService
      .getFilteredLoans({ myId: this.id, friendId: user.id })
      .subscribe((res) => {
        this.loans = res;
        this.isLoansLoaded = true;
      });
  }

  setColor(loan) {
    if (+loan.total >= 0) {
      return '#4eff4e';
    } else {
      return '#ff7c7c';
    }
  }

  repay(id) {
    this.dialog
      .open(RepayComponent, {
        data: id,
      })
      .afterClosed()
      .subscribe((res) => {
        this.getLoans();
      });
  }

  getLoans() {
    this.testService.getLoans(this.id).subscribe((res) => {
      this.loans = res;
      this.isLoansLoaded = true;
    });
    this.testService.getUsers().subscribe((res) => {
      this.users = res;
    });
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }
}
