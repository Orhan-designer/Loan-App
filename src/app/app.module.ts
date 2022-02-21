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

import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProfileComponent } from './user-profile/profile.component';
import { HomeComponent } from './home/home.component';
import { LoansComponent } from './loans/loans.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NewCreditComponent } from './new-credit/new-credit.component';
import { AddNewFriendsComponent } from './add-new-friends/add-new-friends.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    ProfileComponent,
    HomeComponent,
    LoansComponent,
    ContactListComponent,
    NewCreditComponent,
    AddNewFriendsComponent,
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
