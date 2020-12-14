import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../domain/User';
import {InviteAdministratorRequest} from '../../../domain/request/InviteAdministratorRequest';

@Injectable({
  providedIn: 'root'
})
export class SupportUserApiService {

    constructor(private httpClient: HttpClient) {
    }

    getSupportUsers(): Observable<User[]> {
        return this.httpClient.get(this.getUrl('')) as Observable<User[]>;
    }

    inviteAdministrator(userInviteRequest: InviteAdministratorRequest): Observable<any>  {
        return this.httpClient.post(this.getUrl('/invitation'), userInviteRequest) as Observable<any>;
    }

    private getUrl = (path: string) => `/api/users${path}`;
}
