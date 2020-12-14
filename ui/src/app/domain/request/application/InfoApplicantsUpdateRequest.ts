import {Person} from '../../ApplicationCoordinator';
import {Organization} from '../../Organization';

export class InfoApplicantsUpdateRequest {
    person: Person;
    qualification: string;
    publications: string[];
    organization: Organization;
}
