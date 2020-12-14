import {ApplicationGradeStatus} from '../../ApplicationGradeStatus';

export class GradeApplicationRequest {
    grade: ApplicationGradeStatus;


    constructor(grade: ApplicationGradeStatus) {
        this.grade = grade;
    }
}
