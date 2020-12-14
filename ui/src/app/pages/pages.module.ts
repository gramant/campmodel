import {NgModule} from '@angular/core';
import {NotFoundPageComponent} from './not-found/not-found-page.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {RecoverPasswordComponent} from './recover/recover-password.component';
import {RestorePasswordComponent} from './restore-password/restore-password.component';
import {ValidatorsModule} from '../validators/validators.module';
import {CoreModule} from '../core/core.module';
import {RegistrationComponent} from './registration/registration.component';
import {ConfirmEmailComponent} from './confirm-email/confirm-email.component';
import {ForbiddenPageComponent} from './forbidden-page/forbidden-page.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        SharedModule,
        ValidatorsModule,
        CoreModule,
    ],
    exports: [
        RouterModule
    ],
    declarations: [
        LoginComponent,
        RecoverPasswordComponent,
        RestorePasswordComponent,
        NotFoundPageComponent,
        RegistrationComponent,
        ConfirmEmailComponent,
        ForbiddenPageComponent
    ]
})

export class PagesModule {
    constructor() {
    }
}

