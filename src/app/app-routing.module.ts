import { UserLoginComponent } from './user-login/user-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoansComponent } from './loans/loans.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NewCreditComponent } from './new-credit/new-credit.component';
import { AddNewFriendsComponent } from './add-new-friends/add-new-friends.component';
import { UserProfileGuard } from './user-profile.guard';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent, canActivate: [UserProfileGuard] },
  { path: 'loans', component: LoansComponent, canActivate: [UserProfileGuard] },
  { path: 'contact-list', component: ContactListComponent, canActivate: [UserProfileGuard] },
  { path: 'new-credit', component: NewCreditComponent, canActivate: [UserProfileGuard] },
  { path: 'add-new-friends', component: AddNewFriendsComponent, canActivate: [UserProfileGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserProfileGuard]
})
export class AppRoutingModule { }
