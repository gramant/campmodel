import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthApiService} from './auth-api.service';
import {catchError, finalize, switchMap, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../domain/User';
import {AccountApplicantApiService} from '../main/users/account-redirect/account-applicant/account-applicant-api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    constructor(private httpClient: HttpClient,
                private authApiService: AuthApiService,
                private accountApiService: AccountApplicantApiService,
                private router: Router) {
    }

    getCurrentUser(): Observable<User> {
        if (this.currentUser$ && this.currentUser$.getValue()) {
            return this.currentUser$.asObservable();
        } else {
            return this.accountApiService.getCurrentUserFromApi().pipe(
                switchMap(user => {
                    if (this.currentUser$.isStopped) {
                        this.currentUser$ = new BehaviorSubject<User>(null);
                    }

                    this.currentUser$.next(user);
                    return this.currentUser$.asObservable();
                }),
                catchError(error => {
                    if (error instanceof HttpErrorResponse) {
                        switch (error.status) {
                            case 403:
                                this.router.navigate(['login']);
                                this.currentUser$.next(this.currentUser$.getValue());
                                this.currentUser$.complete();
                                return this.currentUser$.asObservable();
                            default:
                                return this.currentUser$.asObservable();
                        }
                    }
                })
            );
        }
    }

    getCurrentUserBehaviorSubject(): BehaviorSubject<User> {
        return this.currentUser$;
    }

    refreshUser() {
        this.accountApiService.getCurrentUserFromApi().pipe(
            tap(user => {
                if (this.currentUser$.isStopped) {
                    this.currentUser$ = new BehaviorSubject<User>(null);
                }

                this.currentUser$.next(user);
            }),
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    switch (error.status) {
                        case 403:
                            this.router.navigate(['login']);
                            this.currentUser$.next(this.currentUser$.getValue());
                            this.currentUser$.complete();
                            return this.currentUser$.asObservable();
                        default:
                            return this.currentUser$.asObservable();
                    }
                }
            })
        ).subscribe();
    }

    logout(): Observable<any> {
        return this.authApiService.logout().pipe(finalize(() => {
            this.resetUser();
            window.location.href = '/'; // need to reload app to clear auth context
        }));
    }

    refreshCsrf() {
        return this.authApiService.refreshCsrf().subscribe();
    }

    private resetUser() {
        this.currentUser$.next(null);
    }
}

