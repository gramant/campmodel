import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../../domain/User';
import {AuthService} from '../../../auth/auth.service';
import {Role} from '../../../domain/Role';

@Component({
  selector: 'app-account-redirect',
  templateUrl: './account-redirect.component.html',
  styleUrls: ['./account-redirect.component.scss']
})
export class AccountRedirectComponent implements OnInit {

    currentUser$: BehaviorSubject<User>;

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
        this.currentUser$ = this.authService.getCurrentUserBehaviorSubject();
    }

    isAdmin() {
        return !!this.currentUser$.getValue().roles.find(value1 => value1 === Role.ADMINISTRATOR);
    }

    isApplicant() {
        return !!this.currentUser$.getValue().roles.find(value1 => value1 === Role.APPLICANT);
    }

    isFunder() {
        return !!this.currentUser$.getValue().roles.find(value1 => value1 === Role.FUNDER);
    }

    isSupport() {
        return !!this.currentUser$.getValue().roles.find(value1 => value1 === Role.SUPPORT);
    }
}
