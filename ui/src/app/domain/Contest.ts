import {FunderId} from './FinancialPlan';

export type ContestId = string;

export class Contest {
    id: ContestId;
    title: string;
    code: string;
    dateCreated: Date;

    publicationDate: Date;
    dateCompleted: Date;

    applicationStart: string;
    applicationDeadline: Date;
    reviewDeadline: Date;
    expertiseDeadline: Date;
    reconciliationDeadline: Date;
    awardingDeadline: Date;

    countries: string[];

    details: Details;


    constructor(id: string, title: string, code: string, dateCreated: Date, publicationDate: Date, dateCompleted: Date, applicationStart: any, applicationDeadline: Date, reviewDeadline: Date, expertiseDeadline: Date, reconciliationDeadline: Date, awardingDeadline: Date, countries: string[], details: Details) {
        this.id = id;
        this.title = title;
        this.code = code;
        this.dateCreated = dateCreated;
        this.publicationDate = publicationDate;
        this.dateCompleted = dateCompleted;
        this.applicationStart = applicationStart;
        this.applicationDeadline = applicationDeadline;
        this.reviewDeadline = reviewDeadline;
        this.expertiseDeadline = expertiseDeadline;
        this.reconciliationDeadline = reconciliationDeadline;
        this.awardingDeadline = awardingDeadline;
        this.countries = countries;
        this.details = details;
    }

    public static parse(value: Contest): Contest {
        return new Contest(value.id,
            value.title,
            value.code,
            new Date(value.dateCreated),
            value.dateCompleted ? new Date(value.publicationDate) : null,
            value.dateCompleted ? new Date(value.dateCompleted) : null,
            value.applicationStart ? new Date(value.applicationStart) : null,
            value.applicationDeadline ? new Date(value.applicationDeadline) : null,
            value.reviewDeadline ? new Date(value.reviewDeadline) : null,
            value.expertiseDeadline ? new Date(value.expertiseDeadline) : null,
            value.reconciliationDeadline ? new Date(value.reconciliationDeadline) : null,
            value.awardingDeadline ? new Date(value.awardingDeadline) : null,
            value.countries,
            value.details
        );
    }

}


export class Details {
    termsUrl: string;
    subjects: string[];
    expenseTypes: string[];
    funderAmounts: FunderAmount[];
    organizers: Organizer[];
}

export class FunderAmount {
    funderId: FunderId;
    amount: number;

    static empty(): FunderAmount {
        return {
            funderId: null,
            amount: 0
        } as FunderAmount;
    }
}

export class Organizer {
    name: string;
    email: string;
    phoneNumber: string;

    static empty(): Organizer {
        return {
            name: '',
            email: '',
            phoneNumber: ''
        } as Organizer;
    }
}
