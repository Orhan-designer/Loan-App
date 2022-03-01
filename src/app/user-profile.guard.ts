import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, tap } from "rxjs";
import { AddNewFriendsComponent } from "./add-new-friends/add-new-friends.component";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class UserProfileGuard implements CanActivate {
    constructor() { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return true;
    };
}
