import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: '../app/app.component.html',
  styleUrls: ['../app/app.component.css']
})

export class AppComponent {
  title = 'LoanApp';

  hasHeader: boolean = false; //начальное булевое значение для скрытия header

  constructor(
    private translateService: TranslateService,
    private router: Router
  ) {
    this.router.events.forEach((event: any) => { //скрываем header в /register и /login
      if (event instanceof NavigationStart) {
        if (event['url'] === '/register') {
          this.hasHeader = false;
        } else if (event['url'] === '/login') {
          this.hasHeader = false;
        } else {
          this.hasHeader = true;
        };
      };
    });
  }

  ngOnInit() { }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value)
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate([`/login`])
  }
}
