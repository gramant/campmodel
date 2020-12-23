import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Campaign} from '../../domain/domain/Campaign';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CampaignApiService {

    constructor(private http: HttpClient
    ) {
    }

    list(): Observable<Campaign[]> {
        return this.http.get(this.getUrl('/')) as Observable<Campaign[]>;
    }

    private getUrl = (path: string) => '/api/campaigns' + path;
}
