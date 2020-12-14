import {ContestId} from './Contest';

export class ContestRef {
    id: ContestId;
    title: string;
    applicationDeadline: Date;

    public static parse(value: ContestRef) {
        value.applicationDeadline  = new Date(value.applicationDeadline);

        return value;
    }
}
