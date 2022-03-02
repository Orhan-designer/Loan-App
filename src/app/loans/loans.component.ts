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

  id: string;

  constructor(
    private testService: TestService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    if(this.testService.userInfo._id) {
      this.id = this.testService.userInfo._id;
    } else {
      this.id = JSON.parse(localStorage.getItem('user'))._id;
    }
    this.getLoans();
  }

  selectUser(user: any) {
    console.log(user)
    this.isLoansLoaded = false;
    this.testService.getFilteredLoans({myId: this.id, friendId: user.id}).subscribe((res) => {
      this.loans = res;
      this.isLoansLoaded = true;
    })
  }

  getLoans() {
    this.testService.getLoans(this.id).subscribe((res) => {
      this.loans = res;
      this.isLoansLoaded = true;
    })
    this.testService.getUsers().subscribe((res) => {
      this.users = res;
    })
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }

}
