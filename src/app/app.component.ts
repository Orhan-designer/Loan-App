import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './services/auth.service';
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
    public authService: AuthService
  ) {
    this.router.events.forEach((event: any) => {
      //скрываем header в /register и /login
      if (event instanceof NavigationStart) {
        if (event['url'] === '/signup') {
          this.hasHeader = false;
        } else if (event['url'] === '/signin') {
          this.hasHeader = false;
        } else {
          this.hasHeader = true;
        }
      }
    });
  }

  ngOnInit() {}

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value);
  }

  //Скрываем навигацию по приложению в бургер-меню, если пользователь не зарегистрирован/авторизован
  userAuthorized() {
    if (this.authService.loggedIn()) {
      return true;
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate([`/signin`]);
  }
}
