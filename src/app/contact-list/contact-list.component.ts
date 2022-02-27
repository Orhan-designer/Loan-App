import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { UsersMemoryDataService } from '../users-memory-data.service';
import { TestService } from '../services/test.service';
import { TranslateService } from '@ngx-translate/core';
import { Users } from 'Loan-App/src/app/users';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  hasHeader: boolean = true;
  displayedColumns: string[] = ['id', 'fullName', 'email', 'city', 'phone', 'delete'];
  dataSource = new MatTableDataSource(this.usersData.users);
  usersLoading: boolean = true;

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
    // console.log(this.testService.getFriends())
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value)
  }

  delete(user: Users): void {
    const index = this.dataSource.data.findIndex((el) => el.id === user.id);
    
    this.dataSource.data.splice(index, 1);
    console.log(this.dataSource.data);
    this.dataSource._updateChangeSubscription();
    
  }
}
