import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {SettingsService} from '../../core/settings/settings.service';
import {LoginRequest} from '../../domain/request/account/LoginRequest';
import {AuthApiService} from '../../auth/auth-api.service';
import {UtilsService} from '../../components/utils.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    isLoginRequest: boolean;
    isLoginRequestSuccess: boolean;
    loginRequestError: string;

    constructor(private router: Router,
                public settings: SettingsService,
                private authApiService: AuthApiService) {
    }

    ngOnInit(): void {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            password: new FormControl('', Validators.required),
            rememberMe: new FormControl(false)
        });

    }

    submitForm() {
        const rq: LoginRequest = {
            email: this.getControl('email').value,
            password: this.getControl('password').value,
            rememberMe: this.getControl('rememberMe').value
        };

        this.isLoginRequest = true;

        this.authApiService.login(rq).subscribe(
            value => {
                this.isLoginRequest = false;
                this.isLoginRequestSuccess = true;
                this.loginRequestError = null;
                this.router.navigate(['/']);
            }, error => {
                this.isLoginRequest = false;
                this.isLoginRequestSuccess = false;
                this.loginRequestError = UtilsService.getErrorText(error);
            }
        );

    }

    getControl(name: string) {
        return this.loginForm.get(name);
    }

}
