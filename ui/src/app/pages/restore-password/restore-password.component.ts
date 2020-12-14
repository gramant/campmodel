import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {SettingsService} from '../../core/settings/settings.service';
import {checkPasswordStrongValidator} from '../../validators/check-password-strong-validator.directive';
import {controlsEqualsValidatorDirective} from '../../validators/controls-equals-validator.directive';
import {RestorePasswordRequest} from '../../domain/request/account/RestorePasswordRequest';
import {AuthApiService} from '../../auth/auth-api.service';
import {UtilsService} from '../../components/utils.service';
import {AuthService} from '../../auth/auth.service';


@Component({
    selector: 'app-password-reset',
    templateUrl: './restore-password.component.html',
    styleUrls: ['./restore-password.component.scss']
})
export class RestorePasswordComponent implements OnInit {

    resetPasswordForm: FormGroup;

    token: string;

    isResetPasswordRequest: boolean;
    isResetPasswordRequestSuccess: boolean;
    resetPasswordError: string;

    constructor(private router: Router,
                private authApiService: AuthApiService,
                public settings: SettingsService,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService
    ) {

    }

    ngOnInit(): void {
        this.authService.refreshCsrf();

        this.resetPasswordForm = new FormGroup({
            password: new FormControl('', [Validators.required, checkPasswordStrongValidator()]),
            repeatPassword: new FormControl('', Validators.required),
        }, {validators: controlsEqualsValidatorDirective('password', 'repeatPassword')});


        this.activatedRoute.params.subscribe((params: Params) => {
            this.token = params.token;
        });

    }

    submit() {
        const rq: RestorePasswordRequest = {
            password: this.getControl('password').value,
            token: this.token
        };

        this.authApiService.resetPassword(rq).subscribe(value => {
            this.isResetPasswordRequest = false;
            this.isResetPasswordRequestSuccess = true;
            this.resetPasswordError = null;
        }, error => {
            this.isResetPasswordRequest = false;
            this.isResetPasswordRequestSuccess = false;
            this.resetPasswordError = UtilsService.getErrorText(error);
        });
    }


    getControl(name: string) {
        return this.resetPasswordForm.get(name);
    }
}
