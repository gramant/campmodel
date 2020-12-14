import {ApplicationId, ApplicationStatus} from './Application';

export class ApplicationRef {
    id: ApplicationId;
    code: string;
    title: string;
    description: string;
    status: ApplicationStatus;
}
