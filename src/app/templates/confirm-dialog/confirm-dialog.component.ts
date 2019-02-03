import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';
import { GlobalService } from '../../service/global.service';
import { ExcelService } from '../../service/excel.service';
import { MatSnackBar } from '@angular/material';
@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

	type = 0;
	description:string;
	id = 0;
	exportData = [];
	collection_id = -1;
	constructor(
        private dialogRef: MatDialogRef<ConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data,
        private router: Router,
		private route: ActivatedRoute,
		private global: GlobalService,
		private api: ApiService,
		private token: TokenService,
		private snackBar: MatSnackBar,
		private excel: ExcelService,
    ) {
		this.id = data.id;
		this.description = data.title;
		this.type = data.type;
		this.collection_id = data.collection_id ? data.collection_id : -1; 
		this.exportData = data.data;
	}

	ngOnInit() {
		
	}
	onCancel() {
        this.dialogRef.close();
	}
	onRemove(){
	    if(this.type == 1){
		    //collection delete
		    return this.api.collection_remove({
			    token: this.token.get(),
			    id: this.id
		    }).subscribe(
			    data => this.handleResponse(data, 1),
			    error => this.handleError(error)
		    );
	    }else if(this.type == 2){
		    //book delete
			return this.api.book_remove({
				token: this.token.get(),
				id: this.id
			}).subscribe(
				data => this.handleResponse(data, 2),
				error => this.handleError(error)
			);
	    }else{
			this.excel.exportAsExcelFile(this.exportData, 'sample');
		}
		this.dialogRef.close();
	}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
		});
	}

	handleResponse(data, type){
		if(type == 1){
			this.openSnackBar(data.result, 'Dismiss');
			this.router.navigate(['']);
			this.dialogRef.close(1);
		}else{
			this.openSnackBar(data.result, 'Dismiss');
			this.router.navigate(['collection-details', this.collection_id]);
			this.dialogRef.close(2);
		}
		
	}

	handleError(error){
		this.dialogRef.close();
	}
}
