import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../service/global.service';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	constructor(
		private router: Router,
		private global: GlobalService
	) { }

	ngOnInit() {
        this.global.subtitle = 'A progressive web app';
	}

    onLogin(){
        this.router.navigate(['login']);
    }
}
