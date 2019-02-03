import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { GlobalService } from '../../service/global.service';
import { ApiService } from '../../service/api.service';
@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

	loading = false;
	submitted = false;
	error: string;
    resetToken: null;
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
	constructor(
		private snackBar: MatSnackBar,
		private router: Router,
		private global: GlobalService,
		private api: ApiService,
        private route: ActivatedRoute
	) {
        route.queryParams.subscribe(params => {
            this.resetToken = params['token']
        });
    }

	ngOnInit() {
        this.global.subtitle = 'Reset Password';
	}

    onSubmit(){
        this.submitted = true;
        this.error = this.getErrorMessage();
        if(this.error != ""){
            this.openSnackBar(this.error, "Dismiss");
        }else{
            this.loading = true;
            return this.api.resetPassword({
                email: this.email.value,
                password: this.password.value,
                resetToken: this.resetToken
            }).subscribe(
                data => this.handleResponse(data),
                error => this.handleError(error)
            );

        }
        this.loading = false;
    }

    onLogin(){
        this.router.navigate(['login']);
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
        console.log(error);
    }

    handleResponse(data){
        this.loading = false;
		this.openSnackBar(data.data, "Dismiss");
        console.log(data);
    }
}
