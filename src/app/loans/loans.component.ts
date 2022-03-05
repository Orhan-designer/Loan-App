import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {
  constructor(
    private testService: TestService,
    private translateService: TranslateService
  ) { }

  isLoansLoaded: boolean = false;
  panelOpenState = false;
  loans: any[] = [];
  users: any[] = [];
  id: string;

  positiveCredit: any[] = [{
    service: '12 days ago Party', loan: -100,
    service2: '6 days ago  “Will return by Friday”', loan2: -120,
    service3: '1 day ago  “Returned funds by card transfer”', loan3: 210
  }];

  totalPrice = this.positiveCredit.reduce((total, item) => {
    return total + item.service.loan;
  });

  ngOnInit(): void {
    if (this.testService.userInfo._id) {
      this.id = this.testService.userInfo._id;
    } else {
      this.id = JSON.parse(localStorage.getItem('user'))._id;
    };
    this.getLoans();
  };

  selectUser(user: any) {
    this.isLoansLoaded = false;
    this.testService.getFilteredLoans({ myId: this.id, friendId: user.id }).subscribe((res) => {
      this.loans = res;
      this.isLoansLoaded = true;
    });
  };

  getLoans() {
    this.testService.getLoans(this.id).subscribe((res) => {
      this.loans = res;
      this.isLoansLoaded = true;
    });
    this.testService.getUsers().subscribe((res) => {
      this.users = res;
    });
  };

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  };

}
