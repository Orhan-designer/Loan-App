import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
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
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { LoansComponent } from './loans/loans.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddNewFriendsComponent } from './add-new-friends/add-new-friends.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { NewFriendsService } from './new-friends.service';
import { LoanServiceService } from './loan-service.service';
import { PopUpComponent } from './pop-up/pop-up.component';
import { NewCreditComponent } from './new-credit/new-credit.component';
import { AuthGuard } from './auth.guard';
import { UserInterceptorService } from './user-interceptor.service';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationComponent,
    LoansComponent,
    ContactListComponent,
    AddNewFriendsComponent,
    UserLoginComponent,
    PopUpComponent,
    NewCreditComponent
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
    MatTabsModule,
    MatDialogModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient],
        },
        defaultLanguage: 'en-US',
      })
  ],
  providers: [AuthService, NewFriendsService, LoanServiceService, AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UserInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
