import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BarecodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { MaterialModule } from './module/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { AuthHeaderComponent } from './templates/auth-header/auth-header.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { CollectionDetailsComponent } from './components/collection-details/collection-details.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { ConfirmDialogComponent } from './templates/confirm-dialog/confirm-dialog.component';
import { BookInformationComponent } from './components/book-information/book-information.component';
import { CollectionAddComponent } from './components/collection-add/collection-add.component';
import { SearchDialogComponent } from './templates/search-dialog/search-dialog.component';
import { BarcodeDialogComponent } from './templates/barcode-dialog/barcode-dialog.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { CollectionDialogComponent } from './templates/collection-dialog/collection-dialog.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { BarcodeScannerComponent } from './templates/barcode-scanner/barcode-scanner.component';
import { SearchPipe } from './pipes/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthHeaderComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgetPasswordComponent,
    CollectionsComponent,
    CollectionDetailsComponent,
    BookDetailsComponent,
    ConfirmDialogComponent,
    BookInformationComponent,
    CollectionAddComponent,
    SearchDialogComponent,
    BarcodeDialogComponent,
    AllBooksComponent,
    CollectionDialogComponent,
    ResetPasswordComponent,
    BookEditComponent,
    BarcodeScannerComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BarecodeScannerLivestreamModule,
    HttpClientModule,
    ZXingScannerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
      ConfirmDialogComponent,
      SearchDialogComponent,
      BarcodeDialogComponent,
      CollectionDialogComponent
  ]
})
export class AppModule { }
