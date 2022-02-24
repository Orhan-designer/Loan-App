import { AuthService } from './auth.service';
import { ProfileComponent } from './user-profile/profile.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoansComponent } from './loans/loans.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NewCreditComponent } from './new-credit/new-credit.component';
import { AddNewFriendsComponent } from './add-new-friends/add-new-friends.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NewFriendsService } from './new-friends.service';
import { LoanServiceService } from './loan-service.service';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    ProfileComponent,
    LoansComponent,
    ContactListComponent,
    NewCreditComponent,
    AddNewFriendsComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatAutocompleteModule,
    TextFieldModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatTabsModule
  ],
  providers: [AuthService, NewFriendsService, LoanServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
