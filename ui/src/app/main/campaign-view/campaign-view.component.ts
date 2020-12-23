import {Component, OnInit } from '@angular/core';
import {Campaign} from '../../domain/domain/Campaign';
import {CampaignApiService} from './campaign-api.service';

@Component({
    selector: 'app-campaign-view',
    templateUrl: './campaign-view.component.html',
    styleUrls: ['./campaign-view.component.scss']
})
export class CampaignViewComponent implements OnInit {

    campaigns: Campaign[];

    constructor(private campaignsApiService: CampaignApiService) { }

    ngOnInit(): void {
        this.campaignsApiService.list().subscribe(value => {
            this.campaigns = value;
            this.campaigns.forEach(value1 => console.log(value1.calculationMethod));
        });
    }

}
