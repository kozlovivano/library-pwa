import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { ConfirmDialogComponent } from '../../templates/confirm-dialog/confirm-dialog.component';
@Component({
	selector: 'app-collection-dialog',
	templateUrl: './collection-dialog.component.html',
	styleUrls: ['./collection-dialog.component.scss']
})
export class CollectionDialogComponent implements OnInit {

	id = 0;
	dialogResult = -1;
	constructor(
		private dialogRef: MatDialogRef<CollectionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) data,
		private router: Router,
		private route: ActivatedRoute,
        private dialog: MatDialog
	) { 
		this.id = data.id;
	}

	ngOnInit() {
		
	}
    onEdit(){
        this.router.navigate(['collection-add', this.id]);
        this.dialogRef.close();
    }
    OnDelete(){
        const deleteDialog = new MatDialogConfig();
		deleteDialog.data = {
			id: this.id,
			title: 'The books in this collection will be removed.',
			type: 1
		}
		const result = this.dialog.open(ConfirmDialogComponent, deleteDialog);
		result.afterClosed().subscribe(
			data => this.dialogResult = data
		);
        this.dialogRef.close(this.dialogResult);
    }
}
