import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../service/global.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	subtitle: string;
	searchEnabled = false;

	searchString;
	constructor(
		private router: Router,
		private global: GlobalService
	) { }

	ngOnInit() {
		this.subtitle = this.global.subtitle;
	}
	onHome(){
		this.router.navigate(['collections']);
	}
	logout(){
		this.global.logout();
	}

	onSearch(flag){
		this.searchEnabled = flag;
	}
	onSearchStringUpdate(){
		this.global.searchString = this.searchString;
	}
}
