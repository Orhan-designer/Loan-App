import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Utils } from './auth.utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private utils: Utils, private _router: Router) {}

  ngOnInit() {}

  canActivate(): boolean {
    if (this.utils.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['contact-list']);
      return false;
    }
  }
}
