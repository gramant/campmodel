import {Injectable} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class CustomToasterService {
    private static ERROR_TITLE_TRANSLATE_KEY = 'toaster.title.error';
    private static SUCCESS_TITLE_TRANSLATE_KEY = 'toaster.title.success';

    private static FORBIDDEN_TRANSLATE_KEY = 'toaster.body.error.forbidden';
    private static UNKNOWN_TRANSLATE_KEY = 'toaster.body.error.unknown';

    constructor(private toasterService: ToasterService,
                private translate: TranslateService
    ) {
    }

    public popSuccess(bodyKey: string) {
        const errorMessageTitle = this.translate.instant(CustomToasterService.SUCCESS_TITLE_TRANSLATE_KEY);
        const errorMessageBody = this.translate.instant(bodyKey);

        this.toasterService.pop('success', errorMessageTitle, errorMessageBody);
    }

    public popError(bodyKey: string) {
        const errorMessageTitle = this.translate.instant(CustomToasterService.ERROR_TITLE_TRANSLATE_KEY);
        const errorMessageBody = this.translate.instant(bodyKey);

        this.toasterService.pop('error', errorMessageTitle, errorMessageBody);
    }

    public popErrorText(text: string) {
        const errorMessageTitle = this.translate.instant(CustomToasterService.ERROR_TITLE_TRANSLATE_KEY);

        this.toasterService.pop('error', errorMessageTitle, text);
    }

    public popErrorForbidden() {
        const errorMessageTitle = this.translate.instant(CustomToasterService.ERROR_TITLE_TRANSLATE_KEY);
        const errorMessageBody = this.translate.instant(CustomToasterService.FORBIDDEN_TRANSLATE_KEY);

        this.toasterService.pop('error', errorMessageTitle, errorMessageBody);
    }

    public popHttpErrorResponse(error: HttpErrorResponse) {
        if (error instanceof HttpErrorResponse) {
            let errorMessageTitle = this.translate.instant(CustomToasterService.ERROR_TITLE_TRANSLATE_KEY);

            errorMessageTitle = errorMessageTitle + error.statusText;

            this.toasterService.pop('error', errorMessageTitle, error.error.message);
        } else {
            const errorMessageTitle = this.translate.instant(CustomToasterService.ERROR_TITLE_TRANSLATE_KEY);
            const errorMessageBody = this.translate.instant(CustomToasterService.UNKNOWN_TRANSLATE_KEY);

            this.toasterService.pop('error', errorMessageTitle, errorMessageBody);
        }
    }
}
