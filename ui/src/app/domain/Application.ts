import {ContestId} from './Contest';
import {UserId} from './User';
import {Applicant} from './Applicant';
import {Funder} from './Funder';

export type ApplicationId = string;
export type ApplicationCode = string;

export class Application {
    id: ApplicationId;
    contestId: ContestId;
    ordinalNumber: number;
    authorId: UserId;
    code: ApplicationCode;
    title: string;
    duration: number;
    description: string;
    plan: string;
    subject: string;
    status: ApplicationStatus;
    applicants: Applicant[];
    attachments: ApplicationAttachment[];
    availableSubjects: string[];
    availableExpenseTypes: string[];
    funders: Funder[];
    minDuration: number;
    maxDuration: number;

    public static parse(value: Application): Application {
        value.applicants = value.applicants.map(val => Applicant.parse(val));

        return value;
    }
}

export class ApplicationAttachment {
    code: string;
    name: string;
}

export enum ApplicationStatus {
    DRAFT = 'DRAFT',
    ACTIVE = 'ACTIVE',
    REVIEWED = 'REVIEWED',
    EXAMINED = 'EXAMINED',
    WON = 'WON',
    DECLINED = 'DECLINED'
}
