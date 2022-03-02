import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { UsersMemoryDataService } from '../users-memory-data.service';
import { TestService } from '../services/test.service';
import { TranslateService } from '@ngx-translate/core';
import { Users } from '../users';

@Component({
  selector: 'app-contact-list',
  templateUrl: '../contact-list/contact-list.component.html',
  styleUrls: ['../contact-list/contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  dataSource = new MatTableDataSource(this.usersData.users);
  usersLoading: boolean = true;
  id: any = {};

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  constructor(
    private usersData: UsersMemoryDataService,
    private _liveAnnouncer: LiveAnnouncer,
    private testService: TestService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    if (this.testService.userInfo._id) {
      this.id = this.testService.userInfo._id;
    } else {
      this.id = JSON.parse(localStorage.getItem('user'))._id;
    }
    this.testService.getFriends(this.id).subscribe((res) => {
      this.dataSource = res;
      this.usersLoading = false;
    })
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value)
  }

}
