import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {first, map} from 'rxjs/operators';
import {User} from '../domain/User';
import {Role} from '../domain/Role';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdministratorGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivateGeneral(next, state);
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivateGeneral(next, state);
    }


    canActivateGeneral(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.getCurrentUser().pipe(
            first(),
            map(value => {
                const user = value as User;
                if (user && user.roles.find(role => role === Role.ADMINISTRATOR)) {
                    return true;
                }

                return this.router.createUrlTree(['403']);
            })
        );
    }
}
