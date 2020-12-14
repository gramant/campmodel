import {ApplicationStatus} from '../../Application';

export class AdministratorVoteApplicationRequest {
   status: ApplicationStatus;


    constructor(status: ApplicationStatus) {
        this.status = status;
    }
}
