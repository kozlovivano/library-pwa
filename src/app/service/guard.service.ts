import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean | Observable<boolean> | Promise<boolean> {
        const isLoggedIn = this.token.loggedIn();
        if(isLoggedIn){
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
  constructor(
      private token: TokenService,
      private router: Router
  ) { }
}
