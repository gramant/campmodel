import {Observable} from 'rxjs';
import {UtilsService} from './utils.service';
import {catchError, tap} from 'rxjs/operators';

export class RequestStatuses {
    isRequest: boolean;
    isRequestSuccess: boolean;
    isRequestFailed: boolean;
    error: string;

    private requestObservable: Observable<any>;

    addCheckStat(request: Observable<any>): Observable<any> {
        this.clear();
        this.requestObservable = request;

        this.isRequest = true;

        return request.pipe(
            tap(value => {
                this.isRequest = false;
                this.isRequestSuccess = true;
                this.isRequestFailed = false;
                this.error = null;
            }),
            catchError(error => {
                this.isRequest = false;
                this.isRequestSuccess = false;
                this.isRequestFailed = true;
                this.error = UtilsService.getErrorText(error);

                throw error;
            })
        );
    }

    public addError(error: any) {
        this.isRequest = false;
        this.isRequestSuccess = false;
        this.isRequestFailed = true;
        this.error = UtilsService.getErrorText(error);
    }

    public static new(): RequestStatuses {
        return new RequestStatuses();
    }

    constructor() {
        this.clear();
    }

    clear() {
        this.isRequest = false;
        this.isRequestSuccess = false;
        this.isRequestFailed = false;
        this.error = null;
    }


}
