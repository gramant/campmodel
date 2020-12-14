import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RequestStatuses} from '../../components/RequestStatuses';
import {AuthApiService} from '../../auth/auth-api.service';
import {AuthService} from '../../auth/auth.service';


@Component({
    selector: 'app-confirm-email',
    templateUrl: './confirm-email.component.html',
    styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

    confirmEmailRequestStat: RequestStatuses = RequestStatuses.new();

    token: string;

    error: string;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private authApiService: AuthApiService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.authService.refreshCsrf();

        this.authApiService.refreshCsrf().subscribe(val => {
            this.activatedRoute.paramMap.subscribe((params: Params) => {
                this.token = params.get('token');

                if (this.token) {
                    this.confirmEmailRequestStat.addCheckStat(this.authApiService.confirmEmail(this.token))
                        .subscribe(value => this.error = null);
                } else {
                    this.error = 'Token not specified';
                }
            });
        });
    }
}
