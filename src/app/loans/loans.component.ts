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
  loans: any;
  users: any[] = [];
  id: any;
  color = '#fafa77';

  ngOnInit(): void {
    if (this.testService.userInfo) {
      this.id = this.testService.userInfo;
    } else {
      this.id = JSON.parse(localStorage.getItem('user')).id;
    }
    this.getLoans();
  }

  selectUser(user: any) {
    this.isLoansLoaded = false;
    this.testService.getLoans(this.id, user.id).subscribe((res) => {
      this.loans = res.values.results;
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

  repay(id: any) {
    this.dialog
      .open(RepayComponent, {
        data: id,
        width: '18.2%',
        height: '22%',
        panelClass: 'custom-dialog-container',
      })
      .afterClosed()
      .subscribe(() => {
        this.getLoans();
      });
  }
  //Функция которая выводит общую сумму за все задолженности всех пользователей, и отдельно каждого по селекту.
  //знак вопроса используется для безопасной загрузки документа HTML, пока компонент генерирует DOC для отображения браузера.
  showSum(val?) {
    /* фильтруем пользователей по второму пользователю и id первого пользвателя, если true, 
    то выводится результат первого пользователя, иначе результат второго пользователя */
    let debts = this.loans.filter((el) =>
      val ? el.secondPersonID === this.id : el.secondPersonID !== this.id
    );

    return debts.reduce((sum, el) => sum + Number(el.total), 0);
  }

  getLoans() {
    this.testService.getLoans(this.id).subscribe((res) => {
      this.loans = res.values.results;
      this.isLoansLoaded = true;
    });
    this.testService.getUsers().subscribe((res) => {
      this.users = res.values;
    });
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }
}
