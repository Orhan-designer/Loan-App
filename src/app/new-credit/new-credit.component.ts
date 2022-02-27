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

  filteredOptions!: Observable<any[]>;
  filteredOptions2!: Observable<any[]>;

  newCreditForm = this.fb.group({
    loanName: ['', Validators.required],
    firstPerson: ['', Validators.required],
    secondPerson: ['', Validators.required],
    howMuch: ['', Validators.required],
    reason: ['', Validators.required],
  });

  constructor(private router: Router,
    public fb: FormBuilder,
    private _ngZone: NgZone,
    private testService: TestService,
    private _loan: LoanServiceService,
    private dialog: MatDialog,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    //call api to get all users
    setTimeout(() => {
      this.options = this.testService.users;
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
    }, 500)
  }

  selectName(option: any) {
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
    this._loan.getLoans(this.addNewCredit)
    .subscribe(
      res => this.addNewCredit = res,
      err => console.log(err)
    );
    this.addNewCredit.date = new Date(); // refactor date
    this.addNewCredit.firstPerson = this.name ? this.name : { name: this.addNewCredit.firstPerson, id: null };
    this.addNewCredit.secondPerson = this.name2 ? this.name2 : { name: this.addNewCredit.secondPerson, id: null };
    this.testService.addLoan(this.addNewCredit);
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
}
