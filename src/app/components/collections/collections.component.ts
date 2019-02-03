import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../service/global.service';
import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { CollectionDialogComponent } from '../../templates/collection-dialog/collection-dialog.component';
import { Subscriber } from 'rxjs';
import { FormControl } from '@angular/forms';
@Component({
	selector: 'app-collections',
	templateUrl: './collections.component.html',
	styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {
	
	loading = true;
	error: string;

	count = 0;
	books = 0;
	collections = [];
	searchKey;
	user_id;
	constructor(
		private router: Router,
		private global: GlobalService,
		private dialog: MatDialog,
		private api: ApiService,
		private token: TokenService,
	) { 
		
	}

	ngOnInit() {
		this.global.subtitle = "Collections";
		this.user_id = localStorage.getItem('user_id');
		this.view();
	}

	onCollectionDetail(collection){
		this.router.navigate(['collection-details', collection.id]);
	}

	onAdd(){
		this.router.navigate(['collection-add']);
	}
	onAllBooks(){
		this.router.navigate(['all-books']);
	}
	onModify(collection){
		
		const collectionDialog = new MatDialogConfig();
		collectionDialog.data = {
			id: collection.id,
		}
		this.dialog.open(CollectionDialogComponent, collectionDialog);
	}
	
	handleResponse(data){
		this.count = data.count;
		this.books = data.books;
		this.collections = data.collections;
		this.loading = false;
	}

	handleError(error) {
		console.log(error);
		this.loading = false;
		this.router.navigate(['/']);
	}

	view(){
		return this.api.collections({
			token: this.token.get(),
			user_id: this.user_id
		}).subscribe(
			data => this.handleResponse(data),
			error => this.handleError(error)
		);
	}
}
