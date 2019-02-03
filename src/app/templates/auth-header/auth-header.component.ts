import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../../service/global.service';
@Component({
	selector: 'app-auth-header',
	templateUrl: './auth-header.component.html',
	styleUrls: ['./auth-header.component.scss']
})
export class AuthHeaderComponent implements OnInit {

    title = 'Library App';
    subtitle = 'A progressive web app';
	constructor( private global: GlobalService ) { }

	ngOnInit() {
		this.subtitle = this.global.subtitle;
	}

}
