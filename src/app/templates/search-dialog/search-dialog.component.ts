import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { GlobalService } from '../../service/global.service';
@Component({
	selector: 'app-search-dialog',
	templateUrl: './search-dialog.component.html',
	styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

	isbn: string;
	c_id;
	constructor(
        private router: Router,
		private route: ActivatedRoute,
        private dialogRef: MatDialogRef<SearchDialogComponent>,
		@Inject(MAT_DIALOG_DATA) data,
		private global: GlobalService,
    ) {
		this.c_id = data.c_id;
	 }

	ngOnInit() {
	}
	onSearch() {
		this.global.isbn = this.isbn;
		this.global.c_id = this.c_id;
        this.router.navigate(['book-information']);
        this.dialogRef.close();
	}
}
