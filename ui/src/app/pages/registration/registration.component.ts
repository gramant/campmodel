import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SettingsService} from '../../core/settings/settings.service';
import {AuthApiService} from '../../auth/auth-api.service';
import {RequestStatuses} from '../../components/RequestStatuses';
import {RegistrationRequest} from '../../domain/request/account/RegistrationRequest';
import {controlsEqualsValidatorDirective} from '../../validators/controls-equals-validator.directive';
import {checkPasswordStrongValidator} from '../../validators/check-password-strong-validator.directive';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    registrationForm: FormGroup;

    registrationRequestStat: RequestStatuses = RequestStatuses.new();

    constructor(private router: Router,
                public settings: SettingsService,
                private authApiService: AuthApiService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.refreshCsrf();

        this.registrationForm = new FormGroup({
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            name: new FormControl('', Validators.required),
            password: new FormControl('', [Validators.required, checkPasswordStrongValidator()]),
            repeatPassword: new FormControl('', Validators.required),
            terms: new FormControl('', Validators.required),
        }, {validators: controlsEqualsValidatorDirective('password', 'repeatPassword')});

    }

    submitForm() {
        const request: RegistrationRequest = {
            email: this.getControl('email').value,
            password: this.getControl('password').value,
            name: this.getControl('name').value,
        };

        this.registrationRequestStat.addCheckStat(this.authApiService.registration(request))
            .subscribe();
    }

    getControl(name: string) {
        return this.registrationForm.get(name);
    }

}
