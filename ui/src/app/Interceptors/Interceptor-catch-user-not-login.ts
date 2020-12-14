import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class InterceptorCatchUserNotLogin implements HttpInterceptor {

    constructor(private router: Router
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                tap(event => {
                }, error => {
                    if (error instanceof HttpErrorResponse
                        && error.status === 401
                        // && error.error.message === 'User was blocked'
                    ) {
                        // this.urlService.navigate(this.urlService.auth.login());
                        this.router.navigateByUrl('/login');
                        return error;
                    }
                }),
            );
    }
}
