import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { CollectionAddComponent } from './components/collection-add/collection-add.component';
import { CollectionDetailsComponent } from './components/collection-details/collection-details.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookInformationComponent } from './components/book-information/book-information.component';
import { BookEditComponent } from './components/book-edit/book-edit.component';
import { AllBooksComponent } from './components/all-books/all-books.component';
import { BarcodeScannerComponent} from './templates/barcode-scanner/barcode-scanner.component';
import { GuardService } from './service/guard.service';
const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'forget-password', component: ForgetPasswordComponent },
	{ path: 'reset-password', component: ResetPasswordComponent },
	{ path: 'collections', component: CollectionsComponent, canActivate: [GuardService]  },
	{ path: 'collection-add', component: CollectionAddComponent, canActivate: [GuardService]  },
	{ path: 'collection-add/:id', component: CollectionAddComponent, canActivate: [GuardService] },
	{ path: 'collection-details/:id', component: CollectionDetailsComponent, canActivate: [GuardService]  },
	{ path: 'book-details/:id', component: BookDetailsComponent, canActivate: [GuardService]  },
    { path: 'book-information', component: BookInformationComponent, canActivate: [GuardService]  },
	{ path: 'book-information/:id', component: BookInformationComponent, canActivate: [GuardService]  },
	{ path: 'book-edit/:id', component: BookEditComponent, canActivate: [GuardService] },
	{ path: 'barcode-scanner', component: BarcodeScannerComponent, canActivate: [GuardService] },
	{ path: 'all-books', component: AllBooksComponent, canActivate: [GuardService]  },
	{ path: '**', redirectTo: 'login' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
