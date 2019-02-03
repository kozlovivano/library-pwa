import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../service/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';
@Component({
	selector: 'app-book-information',
	templateUrl: './book-information.component.html',
	styleUrls: ['./book-information.component.scss']
})
export class BookInformationComponent implements OnInit {

	id: number;
	sub: any;

	loading = false;
	error: string;
	submitted = false;

	title 				= new FormControl('', [Validators.required]);
	author 				= new FormControl('');
	editor 				= new FormControl('');
	publisher 			= new FormControl('');
	publication_date 	= new FormControl('');
	reference 			= new FormControl('');
	category 			= new FormControl('');
	pages 				= new FormControl('');
	volumn 				= new FormControl('');
	cover				= new FormControl('');
	description 		= new FormControl('');
	isbn 				= new FormControl('', [Validators.required]);
	note				= new FormControl('');

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private global: GlobalService,
		private snackBar: MatSnackBar,
		private api: ApiService,
		private token: TokenService,
	) { }

	ngOnInit() {
        this.global.subtitle = "Information";
        this.sub = this.route.params.subscribe(params => {
            if(params['id'] != ""){
                this.id = +params['id']; // (+) converts string 'id' to a number
            }
		});

		if(this.global.isbn != undefined){
			this.loading = true;
			return this.api.book_meta({
				isbn: this.global.isbn
			}).subscribe(
				data => this.handleBookMeta(data),
				error => this.handleError(error)
			);
		}
	}
    onBack(){
        this.global.onBack();
    }
    onSave(){

	}
	
	onSubmit(){
		this.submitted = true;
		this.error = this.getErrorMessage();
		if (this.error != "") {
			this.openSnackBar(this.error, "Dismiss");
		} else {
			this.loading = true;
			return this.api.book_add({
				token: this.token.get(),
				collection_id: this.global.c_id ? this.global.c_id : this.id,
				title: this.title.value,
				author: this.author.value,
				editor: this.editor.value,
				publisher: this.publisher.value,
				publication_date: this.publication_date.value,
				reference: this.reference.value,
				category: this.category.value,
				pages: this.pages.value,
				volumn: this.volumn.value,
				cover: this.cover.value,
				description: this.description.value,
				isbn: this.isbn.value,
				note: this.note.value,
			}).subscribe(
				data => this.handleResponse(data),
				error => this.handleError(error)
			);
		}
	}

	onScan(e){
		e.preventDefault();
		this.onSubmit();
		this.global.onBack();
	}

	////////////////

	getErrorMessage() {
		this.error = "";
		if (this.title.hasError('required')) {
			this.error = 'You must enter title';
		}
		else if (this.isbn.hasError('required')) {
			this.error = 'You must enter ISBN';
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
		if(data){
			this.openSnackBar('Book created successfully', 'Dismiss');
			this.router.navigate(['collections']);
		}
	}

	handleError(error){
		this.loading = false;
		this.openSnackBar('Unexpected error', 'Dismiss');
	}

	handleBookMeta(data){
		this.loading = false;
		console.log(data);
		if (JSON.stringify(data).length != 2){
			var meta;
			var isbn;
			for (var item in data) {
				meta = data[item];
				isbn = item;
			}
			this.title.setValue(meta.title ? meta.title : 'Untitled');
			this.author.setValue(meta.authors ? meta.authors[0].name : 'Unnamed author');
			this.editor.setValue(meta.publish_places ? meta.publish_places[0].name : 'Unidentified');
			this.publisher.setValue(meta.publishers ? meta.publishers[0].name : 'Unknown');
			this.publication_date.setValue(meta.publish_date ? meta.publish_date : 'Unknown');
			this.reference.setValue('');
			this.category.setValue('');
			this.pages.setValue(meta.pagination ? meta.pagination : (meta.number_of_pages ? meta.number_of_pages: 0));
			this.volumn.setValue('1');
			this.cover.setValue(meta.cover ? meta.cover.medium : '../../assets/icons/cover.png');
			this.description.setValue(meta.notes ? meta.notes : 'Lorem ipsum dolor sit amet, ei eam lucilius convenire, aeque sonet definitionem mel ut. Nam fabulas copiosae dissentiunt ad. Sea id albucius sapientem adversarium, eum ut consul possim forensibus. Ad pro alii postulant temporibus.');
			this.isbn.setValue(isbn.split(':')[1]);
			this.note.setValue('');
		}else{
			this.openSnackBar('Invalid ISBN.', 'Dismiss');
			this.global.onBack();
		}
		
	}
}
