import {ProductCode} from './Product';

export class Campaign {
    id: CampaignId;
    name: string;
    productCode: ProductCode;
    calculation: Calculation;
    budget: number;
    weeks: number;

}

export type CampaignId = string;

export enum Calculation {
    ATTRIBUTION = 'ATTRIBUTION', ECONOMETRIC = 'ECONOMETRIC', MIXED = 'MIXED'
}

