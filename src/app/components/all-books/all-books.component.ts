import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { GlobalService } from '../../service/global.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';
import { ConfirmDialogComponent } from '../../templates/confirm-dialog/confirm-dialog.component';
@Component({
	selector: 'app-all-books',
	templateUrl: './all-books.component.html',
	styleUrls: ['./all-books.component.scss'],
	animations:[
		trigger('appear', [
			transition('void => *', [
				style({
					opacity: 0
				}),
				animate(300, style({
					opacity: 1
				}))
			])
		]),
	]
})
export class AllBooksComponent implements OnInit {
	
	id: number;
	sub: any;

	sort_by: string;

	loading = true;
	count = 0;
	books = [];

	constructor(
		private router: Router,
        private global: GlobalService,
		private dialog: MatDialog,
		private api: ApiService,
		private token: TokenService,
	) { }

	ngOnInit() {
        this.global.subtitle = "All books";
		this.sort_by = "title";

		this.view();
	}

    onBookDetail(book){
		this.router.navigate(['book-details', book.id]);
    }

	onBack(){
        this.global.onBack();
    }

	onSort(e){
		this.sort_by = e;
		this.view();
	}


	handleResponse(data){
		
		this.count = data.counts;
		this.books = data.books;
		this.loading = false;
	}
	handleError(error){
		console.log(error);
	}

	onExport(){
		const exportDialog = new MatDialogConfig();
		exportDialog.data = {
			id: -11,
			title: "This collection will be exported to excel.",
			type: 3,
			data: this.books
		}
        this.dialog.open(ConfirmDialogComponent, exportDialog);
	}

	view(){
		return this.api.books({
			collection_id: -1,
			token: this.token.get(),
			sort_by: this.sort_by,
			user_id: localStorage.getItem('user_id')
		}).subscribe(
			data => this.handleResponse(data),
			error => this.handleError(error)
		);
	}
}
