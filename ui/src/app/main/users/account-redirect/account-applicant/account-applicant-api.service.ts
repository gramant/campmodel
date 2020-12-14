import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ChangePasswordRequest} from '../../../../domain/request/account/ChangePasswordRequest';
import {AccountUpdateRequest} from '../../../../domain/request/account/UpdateProfileRequest';
import {Observable} from 'rxjs';
import {User} from '../../../../domain/User';

@Injectable({
    providedIn: 'root'
})
export class AccountApplicantApiService {

    constructor(private httpClient: HttpClient) {
    }

    getCurrentUserFromApi(): Observable<User> {
        return this.httpClient.get(this.getUrl('/me')) as Observable<User>;
    }

    changePassword(changePasswordRequest: ChangePasswordRequest): Observable<any>  {
        return this.httpClient.patch(this.getUrl('/my/password'), changePasswordRequest) as Observable<any>;
    }

    changeAccount(updateProfileRequest: AccountUpdateRequest) {
        return this.httpClient.patch(this.getUrl('/my'), updateProfileRequest);
    }

    private getUrl = (path: string) => `/api/accounts${path}`;
}

