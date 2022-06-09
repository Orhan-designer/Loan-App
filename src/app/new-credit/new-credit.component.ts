import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith, take } from 'rxjs';
import { TestService } from '../services/test.service';
import { LoanServiceService } from '../services/loan.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-new-credit',
  templateUrl: './new-credit.component.html',
  styleUrls: ['./new-credit.component.css'],
})
export class NewCreditComponent implements OnInit {
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private _ngZone: NgZone,
    private testService: TestService,
    private _loan: LoanServiceService,
    private translateService: TranslateService,
    private toastr: ToastrService
  ) {}

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  options: any[] = [];
  usersLoading: boolean = true;

  name: any; //имя пользователя, который даёт в долг
  name2: any; //имя пользователя, который берёт в долг

  userId: string; //id второго пользователя
  myId: string; //id первого пользователя

  filteredOptions!: Observable<any[]>;
  filteredOptions2!: Observable<any[]>;
  //Форма создания кредита для пользователей
  newCreditForm = this.fb.group({
    loanName: ['', Validators.required],
    firstPerson: ['', Validators.required],
    secondPerson: ['', Validators.required],
    howMuch: ['', Validators.required],
    reason: ['', Validators.required],
  });

  addNewCredit = this.newCreditForm.value;

  ngOnInit(): void {
    this.myId = JSON.parse(localStorage.getItem('user')).id;

    if (this.testService.userInfo) {
      this.userId = this.testService.userInfo;
    } else {
      this.userId = JSON.parse(localStorage.getItem('user')).id;
    }

    this.getUsers();
  }

  getUsers() {
    this.testService.getUsers().subscribe((res) => {
      this.options = res.values; //достаём из res.values друзей, чтобы можно было их отфильтровывать в кредите
      this.usersLoading = false;

      let something = res.values.find((user: any) => {
        return user.id === this.myId;
      });

      this.name = something;
      this.newCreditForm.patchValue({ firstPerson: something.name });
      //фильтр имени пользователя, который даёт в долг
      this.filteredOptions = this.newCreditForm.valueChanges.pipe(
        startWith(''),
        map((value) => {
          return this._filter(value ? value.firstPerson : '');
        })
      );
      //фильтр имен пользователей, которые берут в долг
      this.filteredOptions2 = this.newCreditForm.valueChanges.pipe(
        startWith(''),
        map((value) => {
          return this._filter(value ? value.secondPerson : '');
        })
      );
    });
  }
  //автоматический выбор пользователя, который даёт в долг
  selectName(option: any) {
    this.name = option;
  }
  //выбор пользователя, который берёт в долг
  selectName2(option: any) {
    this.name2 = option;
  }

  private _filter(value: any): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      (option) =>
        option.name.toLowerCase().includes(filterValue) &&
        option.id !== this.myId
    );
  }

  triggerResize() {
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  onSubmit(): void {
    this.addNewCredit = this.newCreditForm.value;
    // this.addNewCredit.date = new Date();
    this.addNewCredit.firstPerson = this.name
      ? this.name
      : { name: this.addNewCredit.firstPerson, id: null };
    this.addNewCredit.secondPerson = this.name2
      ? this.name2
      : { name: this.addNewCredit.secondPerson, id: null };
    this.addNewCredit.userId = this.userId;
    this.testService.addLoan(this.addNewCredit);
    this.addNewCredit.howMuch = `-${this.addNewCredit.howMuch}`; //передаём в сервис, форму кредита
    this._loan.createLoan(this.addNewCredit).subscribe(
      (res) => {
        this.toastr.success('Кредит успешно открыт!');
      },
      (err) => console.log(err)
    );
    this.router.navigate([`/loans`]);
  }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }
}
