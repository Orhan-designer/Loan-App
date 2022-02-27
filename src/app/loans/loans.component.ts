import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  isLoansLoaded: boolean = false;
  panelOpenState = false;
  loans: any[] = [];
  users: any[] = [];

  constructor(
    private testService: TestService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getLoans();
  }

  selectUser(user: any) {
    console.log(user)
    //call api and send user
    this.loans = this.loans.filter((el) => {
      return el.secondPerson.id === user.id;
    })
  }

  getLoans() {
    //call api to get all loans get
    //call api to get all users
    setTimeout(() => {
      this.loans = this.testService.loans;
      this.users = this.testService.users;
      // console.log(this.loans)
      this.isLoansLoaded = true;
    }, 500);
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }

}
