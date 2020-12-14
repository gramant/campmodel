import {Application} from './Application';
import {Funder} from './Funder';
import {ApplicationGradeStatus} from './ApplicationGradeStatus';

export class ApplicationGradeSummary {
    application: Application;
    votes: FunderGrade[];
}

export class FunderGrade {
    funder: Funder;
    grade: ApplicationGradeStatus;
}
