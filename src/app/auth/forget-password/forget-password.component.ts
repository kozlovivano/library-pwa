import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { GlobalService } from '../../service/global.service';
import { ApiService } from '../../service/api.service';
@Component({
	selector: 'app-forget-password',
	templateUrl: './forget-password.component.html',
	styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

    loading = false;
    submitted = false;
    error: string;

    email = new FormControl('', [Validators.required, Validators.email]);
	constructor(
		private snackBar: MatSnackBar,
		private router: Router,
		private global: GlobalService,
		private api: ApiService,
	) { }

	ngOnInit() {
		this.global.subtitle = 'Fogot Password?';
	}

    onSubmit(){
        this.submitted = true;
        this.error = this.getErrorMessage();
        if(this.error != ""){
            this.openSnackBar(this.error, "Dismiss");
        }else{
            this.loading = true;
            //HTTP POST request part.
			return this.api.forgetPassword({
				email: this.email.value
			}).subscribe(
				data  => this.handleResponse(data),
				error => this.handleError(error)
			);
        }
        this.loading = false;
    }

    onLogin(){
        this.router.navigate(['login']);
    }
    //Error handling
    getErrorMessage() {
        this.error = "";
        if(this.email.hasError('required')){
            this.error = 'You must enter email';
        }
        else if(this.email.hasError('email')){
            this.error = 'Not a valid email';
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
		this.openSnackBar(data.data, "Dismiss");
    }
}
