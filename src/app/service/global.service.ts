import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    subtitle: string;
    isbn: string;
    c_id;
    uid;

    searchString;

    constructor(
        private router: Router,
        private location: Location,
        private auth: AuthService,
        private token: TokenService
    ) { }
    logout(){
        this.auth.changeAuthStatus(false);
        this.token.remove();
        localStorage.removeItem('user_id');
        this.router.navigate(['']);
    }
    onBack(){
        this.location.back();
    }
}
