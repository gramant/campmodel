import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {AccountUpdateRequest} from '../../../../domain/request/account/UpdateProfileRequest';
import {UpdateAccountApplicantModalComponent} from './update-accaunt-modal/update-account-applicant-modal.component';
import {User} from '../../../../domain/User';
import {ChangePasswordRequest} from '../../../../domain/request/account/ChangePasswordRequest';
import {ChangePasswordModalComponent} from './change-password-modal/change-password-modal.component';
import {RequestStatuses} from '../../../../components/RequestStatuses';
import {AuthService} from '../../../../auth/auth.service';
import {Country} from '../../../../domain/Country';
import {CatalogApiService} from '../../../catalog-api.service';
import {switchMap, tap} from 'rxjs/operators';
import {AccountApplicantApiService} from './account-applicant-api.service';
import {CustomToasterService} from '../../../../components/custom-toaster.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-account-applicant',
    templateUrl: './account-applicant.component.html',
    styleUrls: ['./account-applicant.component.scss']
})
export class AccountApplicantComponent implements OnInit {
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
            UpdateAccountApplicantModalComponent,
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

