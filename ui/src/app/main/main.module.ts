import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {UpdateAccountApplicantModalComponent} from './users/account-redirect/account-applicant/update-accaunt-modal/update-account-applicant-modal.component';
import {ChangePasswordModalComponent} from './users/account-redirect/account-applicant/change-password-modal/change-password-modal.component';
import {CoreModule} from '../core/core.module';
import {SupportUsersBoardComponent} from './users/support-users-board/support-users-board.component';
import {TableModule} from 'ngx-easy-table';
import {NgxTabsModule} from '@ngx-tiny/tabs';
import {NgxCurrencyModule} from 'ngx-currency';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateModule} from '@ngx-translate/core';
import {Ng5SliderModule} from 'ng5-slider';
import {AdministratorUsersBoardComponent} from './users/administrator-users-board/administrator-users-board.component';
import {InviteUserAdministratorModalComponent} from './users/invite-administrator-user-modal/invite-user-administrator-modal.component';
import {AccountComponent} from './users/account-redirect/account/account.component';
import {AccountApplicantComponent} from './users/account-redirect/account-applicant/account-applicant.component';
import {AccountRedirectComponent} from './users/account-redirect/account-redirect.component';
import {UpdateAccountModalComponent} from './users/account-redirect/account/update-accaunt-modal/update-account-modal.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        SharedModule,
        CoreModule,
        TableModule,
        NgxTabsModule,
        NgxCurrencyModule,
        NgSelectModule,
        TranslateModule,
        Ng5SliderModule,
    ],
    exports: [

    ],
    declarations: [
        AccountApplicantComponent,
        ChangePasswordModalComponent,
        UpdateAccountApplicantModalComponent,
        SupportUsersBoardComponent,
        InviteUserAdministratorModalComponent,
        AdministratorUsersBoardComponent,
        AccountComponent,
        AccountRedirectComponent,
        UpdateAccountModalComponent,

    ]
})

export class MainModule {
    constructor() {
    }
}
