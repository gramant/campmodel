import {FunderAmount, Organizer} from '../../Contest';
import {CountryCode} from '../../Country';

export class ChangeContestSummaryRequest {
    title: string;
    code: string;
    termsUrl: string;

    applicationStart: string;
    applicationDeadline: string;
    reviewDeadline: string;
    expertiseDeadline: string;
    reconciliationDeadline: string;
    awardingDeadline: string;

    subjects: string[];
    expenseTypes: string[];
    funders: FunderAmount;
    organizers: Organizer;
    countries: CountryCode[];
}
