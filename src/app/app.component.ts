import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'LoanApp';

  hasHeader: boolean = true;
  hasHeader1: boolean = true;

  constructor(
    private translateService: TranslateService,
  ) { }

  ngOnInit() { }

  public selectLanguage(event: any) {
    this.translateService.use(event.target.value)
  }
}
