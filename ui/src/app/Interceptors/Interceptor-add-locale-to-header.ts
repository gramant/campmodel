import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class InterceptorAddLocaleToHeader implements HttpInterceptor {

    constructor(private translateService: TranslateService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let locale = 'en';

        if (this.translateService && this.translateService.currentLang) {
            locale = this.translateService.currentLang;
        }
        const clonedRequest = req.clone({headers: req.headers.set('Accept-Language', locale)});

        return next.handle(clonedRequest);
    }
}
