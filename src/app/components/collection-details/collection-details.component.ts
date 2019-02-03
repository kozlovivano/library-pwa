import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { GlobalService } from '../../service/global.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';
import { SearchDialogComponent } from '../../templates/search-dialog/search-dialog.component';
import { BarcodeDialogComponent } from '../../templates/barcode-dialog/barcode-dialog.component';
import { ConfirmDialogComponent } from '../../templates/confirm-dialog/confirm-dialog.component';
@Component({
	selector: 'app-collection-details',
	templateUrl: './collection-details.component.html',
	styleUrls: ['./collection-details.component.scss'],
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
export class CollectionDetailsComponent implements OnInit {

	id: number;
	sub: any;

	sort_by: string;
	loading = true;
	count = 0;
	books = [];

	exportData = [];

	collectionName;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
        private global: GlobalService,
		private dialog: MatDialog,
		private api: ApiService,
		private token: TokenService,
	) { }

	ngOnInit() {
		
		this.sort_by = "Title";
		this.global.subtitle = 'Collection details';
		this.sub = this.route.params.subscribe(params => {
			this.id = +params['id']; // (+) converts string 'id' to a number
		});
		
		
		this.view();

	}
	ngOnDestroy() {
		this.sub.unsubscribe();
	}

    onBookDetail(book){
        this.router.navigate(['book-details', book.id]);
    }

	onBack(){
        this.global.onBack();
    }

	onCapture(){
		this.global.c_id = this.id;
		// const barcodeDialog = new MatDialogConfig();
		// this.dialog.open(BarcodeDialogComponent, barcodeDialog);
		this.router.navigate(['barcode-scanner']);
	}
	onSearch(){
		const searchDialog = new MatDialogConfig();
		searchDialog.data = {
			c_id: this.id
		}
		this.dialog.open(SearchDialogComponent, searchDialog);
	}
	onManual(){
		this.router.navigate(['book-information', this.id]);
	}
	onSort(e){
		this.sort_by = e;
		this.view();
	}

	handleResponse(data) {
		this.collectionName = data.collection_name;
		this.count = data.counts;
		this.books = data.books;
		this.exportData = data;
		this.loading = false;
	}
	handleError(error) {
		console.log(error);
	}

	onExport() {
		const exportDialog = new MatDialogConfig();
		exportDialog.data = {
			id: -1,
			title: "This collection will be exported to excel.",
			type: 3,
			data: this.books
		}
		this.dialog.open(ConfirmDialogComponent, exportDialog);
	}

	view(){
		return this.api.books({
			collection_id: this.id,
			token: this.token.get(),
			sort_by: this.sort_by
		}).subscribe(
			data => this.handleResponse(data),
			error => this.handleError(error)
		);
	}
}
