import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class DateHttpInterceptor implements HttpInterceptor {
    // Migrated from AngularJS https://raw.githubusercontent.com/Ins87/angular-date-interceptor/master/src/angular-date-interceptor.js
    private static iso8601Date = /^\d{4}-\d\d-\d\d?$/;
    private static iso8601DateTime = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map(e => {
                if (e instanceof HttpResponse) {
                    const body = e.body;
                    this.convertToDate(body);
                }
                return e;
            })
        );
    }

    convertToDate(body) {
        if (body === null || body === undefined) {
            return body;
        }
        if (typeof body !== 'object') {
            return body;
        }
        for (const key of Object.keys(body)) {
            const value = body[key];
            if (this.isDate(value)) {
                body[key] = this.valueToDate(value);
            }
            if (this.isDateTime(value)) {
                body[key] = this.valueToDateTime(value);
            }
            if (this.isIso8601(value)) {
                body[key] = new Date(value);
            } else if (typeof value === 'object') {
                this.convertToDate(value);
            }
        }
    }

    isIso8601(value) {
        if (value === null || value === undefined) {
            return false;
        }

        return DateHttpInterceptor.iso8601DateTime.test(value);
    }

    private isDate(value: any): boolean {
        if (!(value instanceof Array && value.length === 3)) {
            return false;
        }

        const year = value[0];
        const month = value[1];
        const day = value[2];

        return !isNaN(+year) && year > 1000 && year < 3000
            && !isNaN(+month) && month > 0 && month <= 12
            && !isNaN(+day) && day > 0 && day <= 31;
    }

    private valueToDate(value: any[]): Date {
        const year = value[0];
        const month = value[1];
        const day = value[2];

        return new Date(year as number, month as number, day as number);
    }

    private isDateTime(value: any): boolean {
        if (!(value instanceof Array && value.length === 5)) {
            return false;
        }

        const year = value[0];
        const month = value[1];
        const day = value[2];
        const hour = value[3];
        const min = value[4];

        return !isNaN(+year) && year > 1000 && year < 3000
            && !isNaN(+month) && month > 0 && month <= 12
            && !isNaN(+day) && day > 0 && day <= 31
            && !isNaN(+hour) && hour >= 0 && hour <= 23
            && !isNaN(+min) && min >= 0 && min <= 59;
    }

    private valueToDateTime(value: any[]): Date {
        const year = value[0];
        const month = value[1];
        const day = value[2];
        const hour = value[3];
        const min = value[4];

        return new Date(year as number, month as number, day as number, hour as number, min as number);
    }

}
