import { UserLoginComponent } from './user-login/user-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoansComponent } from './loans/loans.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NewCreditComponent } from './new-credit/new-credit.component';
import { AddNewFriendsComponent } from './add-new-friends/add-new-friends.component';
import { AuthGuard } from './auth.guard';
import { AccountingGroupDebtsComponent } from './accounting-group-debts/accounting-group-debts.component';

const routes: Routes = [
  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: UserRegistrationComponent },
  { path: 'signin', component: UserLoginComponent },
  { path: 'loans', component: LoansComponent, canActivate: [AuthGuard] },
  {
    path: 'contact-list',
    component: ContactListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-credit',
    component: NewCreditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-new-friend',
    component: AddNewFriendsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'accounting-group-debts', component: AccountingGroupDebtsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
