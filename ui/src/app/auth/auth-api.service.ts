import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {LoginRequest} from '../domain/request/account/LoginRequest';
import {RestorePasswordRequest} from '../domain/request/account/RestorePasswordRequest';
import {PasswordRecoveryRequest} from '../domain/request/account/PasswordRecoveryRequest';
import {RegistrationRequest} from '../domain/request/account/RegistrationRequest';

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {

    constructor(private httpClient: HttpClient,
                private router: Router) {
    }

    login(loginRequest: LoginRequest): Observable<any> {
        const body = new URLSearchParams();
        body.set('username', loginRequest.email);
        body.set('password', loginRequest.password);
        body.set('remember-me', String(loginRequest.rememberMe));

        const options = {
            headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        };

        return this.httpClient.post<any>('/api/auth/login', body.toString(), options);
    }

    logout(): Observable<any> {
        return this.httpClient.post('/api/auth/logout', {});
    }

    registration(request: RegistrationRequest) {
        return this.httpClient.post<any>('/api/auth/registration', request);
    }

    sendResetPasswordEmail(sendEmailResetPasswordRequest: PasswordRecoveryRequest) {
        return this.httpClient.post<any>('/api/auth/password', sendEmailResetPasswordRequest);
    }

    resetPassword(resetPasswordRequest: RestorePasswordRequest): Observable<any> {
        return this.httpClient.put('/api/auth/password',  resetPasswordRequest) as Observable<any>;
    }


    changeEmailConfirm(token: string): Observable<any> {
        return this.httpClient.put<any>(`/api/auth/email-token/${token}`, null);
    }

    confirmEmail(token: string): Observable<any> {
        return this.httpClient.put<any>(`/api/auth/email-confirmation/${token}`, null);
    }

    refreshCsrf(): Observable<any>  {
        return this.httpClient.get('/api/csrf');
    }
}
