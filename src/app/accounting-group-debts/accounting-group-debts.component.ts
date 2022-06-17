import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { TestService } from '@app/services/test.service';
import { map, Observable, startWith, take } from 'rxjs';
import { EventService } from '@app/services/event.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accounting-group-debts',
  templateUrl: './accounting-group-debts.component.html',
  styleUrls: ['./accounting-group-debts.component.css'],
})
export class AccountingGroupDebtsComponent implements OnInit {
  constructor(
    private testService: TestService,
    private _ngZone: NgZone,
    private fb: FormBuilder,
    private event: EventService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  options: any[] = [];
  usersLoading: boolean = true;

  name: any;
  name2: any;

  userId: any;
  myId: string;

  filteredOptions: Observable<any[]>;
  filteredOptions2: Observable<any[]>;

  myForm = this.fb.group({
    event: new FormControl('', Validators.required),
    totalSum: new FormControl('', Validators.required),
    firstPerson: new FormControl('', Validators.required),
    userName: new FormArray([new FormControl('', Validators.required)]),
  });

  myNewForm = this.myForm.value;

  ngOnInit(): void {
    this.myId = JSON.parse(localStorage.getItem('user')).id;

    if (this.testService.userInfo) {
      this.userId = this.testService.userInfo.id;
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

      /* Продолжить отсюда, выяснить почему моё имя приходит пустым */
      this.name = something;
      this.myForm.patchValue({ firstPerson: something.name });

      //фильтр имени пользователя, который даёт в долг
      this.filteredOptions = this.myForm.valueChanges.pipe(
        startWith(''),
        map((value) => {
          return this._filter(value ? value.firstPerson : '');
        })
      );
      //фильтр имен пользователей, которые берут в долг
      this.filteredOptions2 = this.myForm.valueChanges.pipe(
        startWith(''),
        map((value) => {
          return this._filter(value ? value.userName : '');
        })
      );
    });
  }
  //выбор пользователя, который будет платить за мероприятие
  selectName(option: any) {
    this.name = option;
  }

  //выбор пользователя, который будет должен за мероприятие
  selectName2(option: any) {
    this.name2 = option;
  }

  private _filter(value: any): any[] {
    const filterValue = value; //удалил toLowerCase(), нужно разобраться почему она даёт ошибку

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

  getFormsControls(): FormArray {
    return this.myForm.controls['userName'] as FormArray;
  }

  // removeUser(i: number) {
  //   const index = <FormArray>this.myForm.controls['userName'];

  //   if (i === 0) {
  //     index.removeAt(i);
  //   }
  // }

  addUser() {
    (<FormArray>this.myForm.controls['userName']).push(
      new FormControl('', Validators.required)
    );
  }

  submit() {
    this.myNewForm = this.myForm.value;
    this.myNewForm.firstPerson = this.name
      ? this.name
      : { name: this.myNewForm.firstPerson, id: null };
    this.myNewForm.userName = this.name2
      ? this.name2
      : { name: this.myNewForm.userName, id: null };
    this.myNewForm.userId = this.userId;
    this.testService.addLoan(this.myNewForm);
    this.myNewForm.totalSum = `-${this.myNewForm.totalSum}`; //передаём в сервис, форму кредита
    this.event.createEvent(this.myNewForm).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Событие успешно создано!');
      },
      (err) => console.log(err)
    );
    this.router.navigate([`/loans`]);
    console.log(this.myForm);
  }
}
