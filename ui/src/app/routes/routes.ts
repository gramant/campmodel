import {LayoutComponent} from '../layout/layout.component';
import {LoginComponent} from '../pages/login/login.component';
import {NotFoundPageComponent} from '../pages/not-found/not-found-page.component';
import {RecoverPasswordComponent} from '../pages/recover/recover-password.component';
import {RestorePasswordComponent} from '../pages/restore-password/restore-password.component';
import {Route} from '@angular/router';
import {RegistrationComponent} from '../pages/registration/registration.component';
import {ConfirmEmailComponent} from '../pages/confirm-email/confirm-email.component';
import {AccountGuard} from '../guards/account.guard';
import {ForbiddenPageComponent} from '../pages/forbidden-page/forbidden-page.component';
import {SupportGuard} from '../guards/support.guard';
import {SupportUsersBoardComponent} from '../main/users/support-users-board/support-users-board.component';
import {AccountRedirectComponent} from '../main/users/account-redirect/account-redirect.component';
import {SinglePageLayoutComponent} from '../layout/single-page-layout/single-page-layout.component';

export const routes: Route [] = [
        {
            path: '',
            component: SinglePageLayoutComponent,
            children: [
                {path: 'login', component: LoginComponent},
                {path: 'registration', component: RegistrationComponent},
                {path: 'confirm-email/:token', component: ConfirmEmailComponent},
                {path: 'password', component: RecoverPasswordComponent},
                {path: 'password/:token', component: RestorePasswordComponent},
            ]
        },

        {
            path: '',
            component: LayoutComponent,
            canActivate: [AccountGuard],
            canActivateChild: [AccountGuard],
            children: [

                {path: 'account/me', component: AccountRedirectComponent},

                {
                    path: '',
                    canActivateChild: [SupportGuard],
                    children: [
                        {path: 'users', component: SupportUsersBoardComponent},
                    ]
                },
            ]
        },


        {path: 'login', component: LoginComponent},
        {path: 'registration', component: RegistrationComponent},
        {path: 'confirm-email/:token', component: ConfirmEmailComponent},
        {path: 'password', component: RecoverPasswordComponent},
        {path: 'password/:token', component: RestorePasswordComponent},

// Not found
        {path: '404', component: NotFoundPageComponent},
// forbidden
        {path: '403', component: ForbiddenPageComponent}
        ,
// {path: '/*path', redirectTo: ['NotFound']},

        {path: '**', redirectTo: '404'}
        ,

    ]
;
