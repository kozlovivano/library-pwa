import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../service/global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ApiService } from '../../service/api.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  id: number;
  sub: any;

  loading = false;
  error: string;
  submitted = false;
  collection_id = -1;

  title               = new FormControl('', [Validators.required]);
  author              = new FormControl('');
  editor              = new FormControl('');
  publisher           = new FormControl('');
  publication_date    = new FormControl('');
  reference           = new FormControl('');
  category            = new FormControl('');
  pages               = new FormControl('');
  volumn              = new FormControl('');
  cover               = new FormControl('');
  description         = new FormControl('');
  isbn                = new FormControl('', [Validators.required]);
  note                = new FormControl('');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private global: GlobalService,
    private snackBar: MatSnackBar,
    private api: ApiService,
    private token: TokenService,
  ) {
    this.global.subtitle = "Book edit";
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] != "") {
        this.id = +params['id']; // (+) converts string 'id' to a number
      }
    });
   }

  ngOnInit() {
    if(this.id){
      this.loading = true;
      return this.api.book({
        token: this.token.get(),
        id: this.id
      }).subscribe(
        data => this.handleBook(data),
        error => console.log(error)
      );
    }
    
  }
  onBack() {
    this.global.onBack();
  }
  onSave() {

  }

  onSubmit() {
    this.submitted = true;
    this.error = this.getErrorMessage();
    if (this.error != "") {
      this.openSnackBar(this.error, "Dismiss");
    } else {
      this.loading = true;
      return this.api.book_edit({
        token: this.token.get(),
        id: this.id,
        collection_id: this.collection_id,
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

  handleBook(data){
    this.collection_id = data.collection_id;
    this.title.setValue( data.book.title );
    this.author.setValue( data.book.author );
    this.editor.setValue( data.book.editor );
    this.publisher.setValue( data.book.publisher );
    this.publication_date.setValue( data.book.publication_date );
    this.reference.setValue( data.book.reference );
    this.category.setValue( data.book.category );
    this.pages.setValue( data.book.pages );
    this.volumn.setValue( data.book.volumn );
    this.cover.setValue( data.book.cover );
    this.description.setValue( data.book.description );
    this.isbn.setValue( data.book.isbn );
    this.note.setValue( data.book.note );
    this.loading = false;
  }

  handleResponse(data) {
    this.loading = false;
    //console.log(data);
    if (data) {
      this.openSnackBar('Book updated successfully', 'Dismiss');
      this.router.navigate(['collection-details', this.collection_id]);
    }
  }

  handleError(error) {
    this.loading = false;
    this.openSnackBar('Unexpected error', 'Dismiss');
  }
}
