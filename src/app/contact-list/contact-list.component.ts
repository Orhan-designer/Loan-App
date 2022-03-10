import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { UsersMemoryDataService } from '../services/users-memory-data.service';
import { TestService } from '../services/test.service';
import { TranslateService } from '@ngx-translate/core';
import { Users } from '../users';

@Component({
  selector: 'app-contact-list',
  templateUrl: '../contact-list/contact-list.component.html',
  styleUrls: ['../contact-list/contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  constructor(
    private usersData: UsersMemoryDataService,
    private _liveAnnouncer: LiveAnnouncer,
    private testService: TestService,
    private translateService: TranslateService
  ) { }

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone'];
  dataSource = new MatTableDataSource(this.usersData.users);
  usersLoading: boolean = true;
  id: any = {};
  searchValue: string = '';

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  };

  applyFilter(event: Event) {
    this.getFriends();
    return event;
  };

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    };
  };

  ngOnInit(): void {
    if (this.testService.userInfo._id) {
      this.id = this.testService.userInfo._id;
    } else {
      this.id = JSON.parse(localStorage.getItem('user'))._id;
    };

    this.getFriends();
  }

  getFriends() {
    this.usersLoading = true;
    this.testService.getFriends(this.id, this.searchValue).subscribe((res) => {
      this.dataSource = res;
      this.usersLoading = false;
    });
  };

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  };

}
