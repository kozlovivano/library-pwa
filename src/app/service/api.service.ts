import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
	providedIn: 'root'
})
export class ApiService {

    private baseURL = 'http://localhost:8000/api/';

	constructor(
		private http: HttpClient
	) { }

	login(data) {
		return this.http.post(`${this.baseURL}login`, data);
	}

	me(data) {
		return this.http.post(`${this.baseURL}me`, data);
	}

	register(data) {
		return this.http.post(`${this.baseURL}register`, data);
	}

	forgetPassword(data){
		return this.http.post(`${this.baseURL}forgetPassword`, data);
	}

	resetPassword(data){
		return this.http.post(`${this.baseURL}resetPassword`, data);
	}

	collections(data){
		return this.http.post(`${this.baseURL}collections`, data);
	}

	collection(data) {
		return this.http.post(`${this.baseURL}collection`, data);
	}

	collection_add(data) {
		return this.http.post(`${this.baseURL}collection_add`, data);
	}

	collection_edit(data) {
		return this.http.post(`${this.baseURL}collection_edit`, data);
	}

	collection_remove(data) {
		return this.http.post(`${this.baseURL}collection_remove`, data);
	}

	books(data) {
		return this.http.post(`${this.baseURL}books`, data);
	}

	book(data) {
		return this.http.post(`${this.baseURL}book`, data);
	}

	book_add(data) {
		return this.http.post(`${this.baseURL}book_add`, data);
	}

	book_edit(data) {
		return this.http.post(`${this.baseURL}book_edit`, data);
	}

	book_remove(data) {
		return this.http.post(`${this.baseURL}book_remove`, data);
	}

	book_meta(data){
		return this.http.get('https://openlibrary.org/api/books?bibkeys=ISBN:' + data.isbn + '&jscmd=data&format=json');
		//return this.http.get('https://openlibrary.org/api/books?bibkeys=ISBN:9781476740188 &jscmd=data&format=json');
	}
}
