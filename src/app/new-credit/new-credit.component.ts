import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith, take } from 'rxjs';
import { TestService } from '../services/test.service';
import { LoanServiceService } from '../loan-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '@app/user.service';
@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.css']
})
export class NewCreditComponent implements OnInit {

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  options: any[] = [];
  usersLoading: boolean = true;

  name: any;
  name2: any;

  userId: string;

  filteredOptions!: Observable<any[]>;
  filteredOptions2!: Observable<any[]>;

  newCreditForm = this.fb.group({
    loanName: ['', Validators.required],
    firstPerson: ['', Validators.required],
    secondPerson: ['', Validators.required],
    howMuch: ['', Validators.required],
    reason: ['', Validators.required],
  });

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private _ngZone: NgZone,
    private testService: TestService,
    private _loan: LoanServiceService,
    private dialog: MatDialog,
    private translateService: TranslateService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.testService.userInfo._id) {
      this.userId = this.testService.userInfo._id;
    } else {
      this.userId = JSON.parse(localStorage.getItem('user'))._id;
    }
    this.getUsers();
  }

  getUsers() {
    this.testService.getUsers().subscribe((res) => {
      this.options = res;
      this.usersLoading = false;
      this.filteredOptions = this.newCreditForm.valueChanges.pipe(
        startWith(''),
        map(value => {
          return this._filter(value ? value.firstPerson : '')
        }),
      );
      this.filteredOptions2 = this.newCreditForm.valueChanges.pipe(
        startWith(''),
        map(value => {
          return this._filter(value ? value.secondPerson : '')
        }),
      );
    })
  }

  selectName(option: any) {
    console.log(option)
    this.name = option;
  }

  selectName2(option: any) {
    this.name2 = option;
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  addNewCredit = this.newCreditForm.value;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSubmit(): void {
    this.addNewCredit = this.newCreditForm.value;
    console.log(this.name)
    this.addNewCredit.date = new Date(); // refactor date
    this.addNewCredit.firstPerson = this.name ? this.name : { name: this.addNewCredit.firstPerson, id: null };
    this.addNewCredit.secondPerson = this.name2 ? this.name2 : { name: this.addNewCredit.secondPerson, id: null };
    this.addNewCredit.userId = this.userId;
    this.testService.addLoan(this.addNewCredit);
    this._loan.createLoan(this.addNewCredit).subscribe(
      res => {
        console.log(res)
      },
      err => console.log(err)
    );
    this.router.navigate([`/loans`])
  }

  createDialog() {
    this.dialog.open(PopUpComponent, {
      data: {
        openLoan: 'A new loan has been added to your loans list'
      }
    });
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value)
  }

  container =
    `
  <mat-form-field>
    <mat-label>{{'label.email' | translate}}</mat-label>
    <input type="email" matInput id="email" name="email" placeholder="john@example.com" required
      formControlName="email">
    <mat-error *ngIf="newFriendForm.controls['email'].hasError('required')">
      {{'errors.emailRequired' | translate}}
    </mat-error>
    <mat-error
      *ngIf="newFriendForm.controls['email'].hasError('email') && !newFriendForm.controls['email'].hasError('required')">
        {{'errors.emailIsValid' | translate}}
    </mat-error>
  </mat-form-field>

  <mat-form-field>
            <mat-label>last name</mat-label>
            <input type="text" matInput id="lastName" name="lastName" placeholder="Last Name" required
                formControlName="lastName">
            <mat-error *ngIf="newFriendForm.controls['lastName'].hasError('required')">
                {{'errors.emailRequired' | translate}}
            </mat-error>
        </mat-form-field>

  `
  openDialog() {
    this.dialog.open(PopUpComponent, {
      data: {
        container: this.container
      },
    });
  }
}

