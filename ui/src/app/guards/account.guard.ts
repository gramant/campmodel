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
import {AuthService} from '../auth/auth.service';
import {Role} from '../domain/Role';

@Injectable({
    providedIn: 'root'
})
export class AccountGuard implements CanActivate, CanActivateChild {

    constructor(private router: Router,
                private authService: AuthService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivateGeneral(next, state);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivateGeneral(childRoute, state);
    }

    private canActivateGeneral(childRoute: ActivatedRouteSnapshot,
                               state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.getCurrentUser().pipe(
            first(),
            map(value => {
                const user = value as User;
                if (user
                    && User.isUserHasRole(Role.APPLICANT, user)
                    && !user.accountFilled
                    && state.url.indexOf('account/me') === -1) {
                    return this.router.createUrlTree(['account/me']);
                }

                if (user) {
                    if (state.url === '/') {
                        if (User.isUserHasRole(Role.SUPPORT, user)) {
                            return this.router.createUrlTree(['/users']);
                        } else {
                            return this.router.createUrlTree(['/dashboard']);
                        }
                    } else {
                        return true;
                    }
                } else {
                    return this.router.createUrlTree(['/login']);
                }
            })
        );
    }

    private isUserHasRole(role: Role, currentUser: User) {
        return !!(currentUser.roles.find(value1 => value1 === role));
    }
}
