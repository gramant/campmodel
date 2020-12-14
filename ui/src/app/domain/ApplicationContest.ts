import {ContestId} from './Contest';
import {ApplicationRef} from './ApplicationRef';

export class ApplicationContest {
    id: ContestId;
    title: string;
    applicationDeadline: Date;
    applications: ApplicationRef[];

    public static parse(value: ApplicationContest): ApplicationContest {
        value.applicationDeadline = new Date(value.applicationDeadline);

        return value;
    }
}
