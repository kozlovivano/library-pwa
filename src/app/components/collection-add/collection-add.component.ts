import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../service/global.service';
import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';
import { MatSnackBar } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
@Component({
	selector: 'app-collection-add',
	templateUrl: './collection-add.component.html',
	styleUrls: ['./collection-add.component.scss']
})
export class CollectionAddComponent implements OnInit {

	loading = false;
	submitted = false;
	error: string;

	id: number;
	sub: any;

	name = new FormControl('', [Validators.required]);
	reference = new FormControl('', [Validators.required]);

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private global: GlobalService,
		private api: ApiService,
		private token: TokenService,
		private snackBar: MatSnackBar,
	) { }

	ngOnInit() {
		this.global.subtitle = "Collection information";
		this.sub = this.route.params.subscribe(params => {
			this.id = +params['id']; // (+) converts string 'id' to a number
		});
		if(this.id){
			this.loading = true;
			this.api.collection({
				token: this.token.get(),
				id: this.id
			}).subscribe(
				data => this.handleFormResponse(data),
				error => this.handleError(error)
			);
		}
	}

    onBack(){
        this.global.onBack();
    }

    onDiscard(){
        this.router.navigate(['collections']);
    }
	onCancel(event){
		event.preventDefault();
		this.global.onBack();
	}

	onSubmit(){
		this.submitted = true;
		this.error = this.getErrorMessage();
		if (this.error != "") {
			this.openSnackBar(this.error, "Dismiss");
		} else {
			this.loading = true;
			if(this.id){
				return this.api.collection_edit({
					token: this.token.get(),
					id: this.id,
					name: this.name.value,
					reference: this.reference.value,
				}).subscribe(
					data => this.handleResponse(data),
					error => this.handleError(error)
				);
			}else{
				return this.api.collection_add({
					token: this.token.get(),
					name: this.name.value,
					reference: this.reference.value,
					user_id: localStorage.getItem('user_id')
				}).subscribe(
					data => this.handleResponse(data),
					error => this.handleError(error)
				);
			}
		}
	}

	getErrorMessage() {
		this.error = "";
		if (this.name.hasError('required')) {
			this.error = 'You must enter name';
		}
		else if (this.reference.hasError('required')) {
			this.error = 'You must enter reference';
		}

		return this.error;
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	handleResponse(data){
		this.loading = false;
		this.openSnackBar(data.result, "Dismiss");
		this.router.navigate(['collections']);
	}

	handleError(error){
		this.loading = false;
		this.openSnackBar(error.result, "Dismiss");
	}

	handleFormResponse(data){
		this.loading = false;
		this.name.setValue(data.collection.name);
		this.reference.setValue(data.collection.reference)
	}
}
