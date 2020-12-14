import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {catchError, finalize, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {AuthApiService} from '../../auth/auth-api.service';
import {SettingsService} from '../../core/settings/settings.service';
import {UtilsService} from '../../components/utils.service';
import {PasswordRecoveryRequest} from '../../domain/request/account/PasswordRecoveryRequest';
import {AuthService} from '../../auth/auth.service';


@Component({
    selector: 'app-recover',
    templateUrl: './recover-password.component.html',
})
export class RecoverPasswordComponent implements OnInit {

    recoveryForm: FormGroup;
    isSendingData = false;

    constructor(public settings: SettingsService,
                private authApiService: AuthApiService,
                private authService: AuthService,
                private toasterService: ToasterService,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.authService.refreshCsrf();

        this.recoveryForm = this.fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])]
        });
    }

    submitForm() {
        this.isSendingData = true;

        const rq: PasswordRecoveryRequest = {
            email: this.getControl('email').value
        };

        this.authApiService.sendResetPasswordEmail(rq).pipe(
            tap(() => {
                    this.toasterService.popAsync('success', 'Success', 'Please check email').subscribe();
                    this.router.navigate(['/login']);
                }
            ),
            catchError(err => {
                this.toasterService.popAsync('error', 'Error', UtilsService.getErrorText(err)).subscribe();
                return EMPTY;
            }),
            finalize(() => this.isSendingData = false)
        ).subscribe();

    }

    getControl(name: string) {
        return this.recoveryForm.get(name);
    }
}
