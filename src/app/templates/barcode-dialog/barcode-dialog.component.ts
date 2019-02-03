import { Component, ViewChild, AfterViewInit, Inject } from '@angular/core';
import { BarecodeScannerLivestreamComponent } from 'ngx-barcode-scanner';
import { GlobalService } from '../../service/global.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-barcode-dialog',
	templateUrl: './barcode-dialog.component.html',
	styleUrls: ['./barcode-dialog.component.scss']
})
export class BarcodeDialogComponent implements AfterViewInit {

	constructor(
		private global: GlobalService,
		private router: Router,
	) { }

	@ViewChild(BarecodeScannerLivestreamComponent)
	BarecodeScanner: BarecodeScannerLivestreamComponent;

	barcodeValue;

	ngAfterViewInit(): void {
		this.BarecodeScanner.start();
	}

	onValueChanges(value) {
		this.barcodeValue = value.code;
		this.global.isbn = this.barcodeValue;
		console.log(value);
		//this.router.navigate(['book-information']);
	}

}
