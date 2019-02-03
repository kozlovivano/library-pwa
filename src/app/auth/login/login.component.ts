import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { GlobalService } from '../../service/global.service';
import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';
import { AuthService } from '../../service/auth.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loading = false;
    submitted = false;
    error: string;

    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);

    constructor(
        private snackBar: MatSnackBar,
        private router: Router,
        private global: GlobalService,
        private api: ApiService,
        private token: TokenService,
        private auth: AuthService
    ) { }

    ngOnInit() {
        this.global.subtitle = 'Login';
        if(this.token.isValid()){
            this.router.navigate(['collections']);
        }
    }
    onSubmit(){
        this.submitted = true;
        this.error = this.getErrorMessage();
        if(this.error != ""){
            this.openSnackBar(this.error, "Dismiss");
        }else{
            this.loading = true;
            return this.api.login({
                email: this.email.value,
                password: this.password.value
            }).subscribe(
                data => this.handleResponse(data),
                error => this.handleError(error)
            );
        }
    }

    onRegister(){
        this.router.navigate(['register']);
    }
    onForgetPassword(){
        this.router.navigate(['forget-password']);
    }
    
    getErrorMessage() {
        this.error = "";
        if(this.email.hasError('required')){
            this.error = 'You must enter email';
        }
        else if(this.email.hasError('email')){
            this.error = 'Not a valid email';
        }
        else if(this.password.hasError('required')){
            this.error = 'You must enter password';
        }

        return this.error;
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    handleError(error){
        this.loading = false;
        if(error.error.error != undefined){
			this.error = error.error.error;
		}else{
			this.error = "Server is not responding.";
		}
        this.openSnackBar(this.error, "Dismiss");
    }

    handleResponse(data){
        this.loading = false;
        this.token.handle(data.access_token);
        localStorage.setItem('user_id', data.user_id);
        this.auth.changeAuthStatus(true);
        this.router.navigate(['collections']);
    }
}
