import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {CustomToasterService} from '../components/custom-toaster.service';

@Injectable()
export class InterceptorCatch502ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private customToasterService: CustomToasterService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
            .pipe(
                tap(event => {
                }, error => {
                    if (error instanceof HttpErrorResponse
                        && error.status === 504
                    ) {
                        this.customToasterService.popErrorText('504 Gateway Timeout');
                        return error;
                    }
                }),
            );
    }
}
