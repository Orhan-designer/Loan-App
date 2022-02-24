import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { Users } from '../users';
import { UsersMemoryDataService } from '../users-memory-data.service';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  navigation = ['Loans', 'Contact List', 'New Loan', 'Add New Friends'];
  
  displayedColumns: string[] = ['id', 'fullName', 'email', 'address', 'city', 'phone', 'gender'];
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
    private testService: TestService) { }

  ngOnInit(): void {
    console.log(this.testService.getFriends())
  }
}
