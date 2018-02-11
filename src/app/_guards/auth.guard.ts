import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionStorage } from 'ngx-webstorage';

@Injectable()
export class AuthGuard implements CanActivate {

    @SessionStorage('userLogin')
    private userLogin;


    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.userLogin != null) {
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
