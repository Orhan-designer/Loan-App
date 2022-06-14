import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
import { Utils } from './auth.utils';
@Component({
  selector: 'app-root',
  templateUrl: '../app/app.component.html',
  styleUrls: ['../app/app.component.css'],
})
export class AppComponent {
  title = 'LoanApp';

  hasHeader: boolean = false; //начальное булевое значение для скрытия header

  constructor(
    private translateService: TranslateService,
    private router: Router,
    public utils: Utils,
  ) {
    // Сделать проверку по токену, если есть, то отображать навигацию в меню бургер, если токена нет, то скрывать.
    // Нужно доставать токен из localstorage и делать по нему проверку.
    this.router.events.subscribe(() => {
      if (localStorage.getItem('token') !== '/signup') {
        this.hasHeader = false;
      } else if (localStorage.getItem('token') !== '/signin') {
        this.hasHeader = false;
      } else {
        this.hasHeader = true;
      }
    });
  }

  ngOnInit() {}

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }
  //Скрываем навигацию по приложению в бургер-меню, если пользователь не зарегистрирован/авторизован
  isAuthorized() {
    if (this.utils.loggedIn()) {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate([`/signin`]);
  }
}
