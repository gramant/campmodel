import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../../domain/User';
import {Country} from '../../../../domain/Country';
import {RequestStatuses} from '../../../../components/RequestStatuses';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AccountApplicantApiService} from '../account-applicant/account-applicant-api.service';
import {AuthService} from '../../../../auth/auth.service';
import {CatalogApiService} from '../../../catalog-api.service';
import {switchMap, tap} from 'rxjs/operators';
import {ChangePasswordModalComponent} from '../account-applicant/change-password-modal/change-password-modal.component';
import {ChangePasswordRequest} from '../../../../domain/request/account/ChangePasswordRequest';
import {AccountUpdateRequest} from '../../../../domain/request/account/UpdateProfileRequest';
import {UpdateAccountModalComponent} from './update-accaunt-modal/update-account-modal.component';
import {CustomToasterService} from '../../../../components/custom-toaster.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
    currentUser$: Observable<User>;
    user: User;

    userCountry: Country;

    passwordRequestStat = RequestStatuses.new();
    accountUpdateRequestStat = RequestStatuses.new();

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private modalService: BsModalService,
        private customToasterService: CustomToasterService,
        private accountApiService: AccountApplicantApiService,
        private authService: AuthService,
        private catalogApiService: CatalogApiService
    ) {
    }

    ngOnInit(): void {
        this.currentUser$ = this.authService.getCurrentUser();
        this.currentUser$.pipe(
            tap(profile => this.user = User.parse(profile)),
            switchMap(user => this.catalogApiService.getCountry(user.countryCode)),
            tap(value => this.userCountry = value)
        ).subscribe();
    }

    openChangePasswordModal() {
        this.passwordRequestStat.clear();
        const modalRef = this.modalService.show(
            ChangePasswordModalComponent,
            {
                initialState: {
                    passwordRequestStat: this.passwordRequestStat,
                    submit: (changePasswordRequest: ChangePasswordRequest) => {
                        return this.doChangePassword(changePasswordRequest, modalRef);
                    },
                },
                backdrop: 'static'
            }
        );
    }

    doChangePassword(changePasswordRequest: ChangePasswordRequest, modalRef: BsModalRef) {
        const requestObservable: Observable<any> = this.accountApiService.changePassword(changePasswordRequest);

        requestObservable.subscribe(value => {
                modalRef.hide();
                this.authService.refreshUser();
                this.customToasterService.popSuccess('Password was successfully updated');
            },
            error => {
                if (error instanceof HttpErrorResponse) {
                    const err = error as HttpErrorResponse;
                    this.customToasterService.popError(err.error.message);
                }
            });
        this.passwordRequestStat.addCheckStat(requestObservable);
    }


    openUpdateAccountModal() {
        const modalRef = this.modalService.show(
            UpdateAccountModalComponent,
            {
                initialState: {
                    user: this.user,
                    accountUpdateRequestStat: this.accountUpdateRequestStat,
                    submit: (updateProfileRequest: AccountUpdateRequest) => {
                        return this.doUpdateProfile(updateProfileRequest, modalRef);
                    },
                },
                class: 'modal-lg',
                backdrop: 'static'
            }
        );
    }


    doUpdateProfile(updateAccountRequest: AccountUpdateRequest, modalRef: BsModalRef) {
        this.passwordRequestStat.addCheckStat(this.accountApiService.changeAccount(updateAccountRequest))
            .subscribe(value => {
                    modalRef.hide();
                    this.authService.refreshUser();
                    this.customToasterService.popSuccess('Profile was successfully updated');
                },
                error => {
                    if (error instanceof HttpErrorResponse) {
                        const err = error as HttpErrorResponse;
                        this.customToasterService.popError(err.error.message);
                    }
                });
    }

}
