import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../service/global.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';
import { ConfirmDialogComponent } from '../../templates/confirm-dialog/confirm-dialog.component';
@Component({
	selector: 'app-book-details',
	templateUrl: './book-details.component.html',
	styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

	id: number;
	sub: any;
	loading = true;

	book = [];
	collection_name: string;
	collection_id = -1;

	title: string;
	author: string;
	editor: string;
	publication_date: string;
	publisher: string;
	category: string;
	description: string;
	pages: string;
	isbn: string;
	cover: string;
	note: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private global: GlobalService,
		private dialog: MatDialog,
		private api: ApiService,
		private token: TokenService,
	) { }

	ngOnInit() {
		this.global.subtitle = "Book detail";
		this.sub = this.route.params.subscribe(params => {
			this.id = +params['id']; // (+) converts string 'id' to a number
		});
		return this.api.book({
			id: this.id,
			token: this.token.get()
		}).subscribe(
			data => this.handleResponse(data),
			error => this.handleError(error)
		);
	}
	ngOnDestroy() {
		this.sub.unsubscribe();
	}
	onBack() {
		this.global.onBack();
	}

    onEdit(){
        this.router.navigate(['book-edit', this.id]);
    }

	onDelete(): void {
        const deleteDialog = new MatDialogConfig();
		deleteDialog.data = {
			id: this.id,
			title: "This book will be removed.",
			type: 2,
			collection_id: this.collection_id
		}
        this.dialog.open(ConfirmDialogComponent, deleteDialog);
	}

	handleResponse(data){

		this.book = data.book;

		this.title = data.book.title;
		this.author = data.book.author;
		this.editor = data.book.editor;
		this.publication_date = data.book.publication_date;
		this.publisher = data.book.publisher;
		this.category = data.book.category;
		this.description = data.book.description;
		this.pages = data.book.pages;
		this.isbn = data.book.isbn;
		this.cover = data.book.cover;
		this.collection_name = data.collection_name;
		this.collection_id = data.collection_id;
		this.note = data.book.note;
		this.loading = false;
	}
	handleError(error){
		this.loading = false;
	}
}
