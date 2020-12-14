import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../domain/User';
import {AccountUpdateRequest} from '../../../domain/request/account/UpdateProfileRequest';
import {InviteAdministratorRequest} from '../../../domain/request/InviteAdministratorRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

    constructor(private httpClient: HttpClient) {
    }

    getAdminUsers(): Observable<User[]> {
        return this.httpClient.get(this.getUrl('')) as Observable<User[]>;
    }

    inviteSupport(userInviteRequest: InviteAdministratorRequest): Observable<any>  {
        return this.httpClient.post(this.getUrl('/users/invitation'), userInviteRequest) as Observable<any>;
    }

    changeAccount(updateProfileRequest: AccountUpdateRequest) {
        return this.httpClient.patch(this.getUrl('/my'), updateProfileRequest);
    }

    private getUrl = (path: string) => `/api/administrator/users${path}`;
}
