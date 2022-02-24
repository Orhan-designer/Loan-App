import { UserLoginComponent } from './user-login/user-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from 'Loan-App/src/app/user-profile/profile.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoansComponent } from './loans/loans.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NewCreditComponent } from './new-credit/new-credit.component';
import { AddNewFriendsComponent } from './add-new-friends/add-new-friends.component';
import { UserProfileGuard } from './user-profile.guard';

const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate:[UserProfileGuard] },
  { path: 'loans', component: LoansComponent },
  { path: 'contact-list', component: ContactListComponent },
  { path: 'new-credit', component: NewCreditComponent },
  { path: 'add-new-friends', component: AddNewFriendsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserProfileGuard]
})
export class AppRoutingModule { }
