import {Application} from './Application';
import {ApplicationVoteState} from './ApplicationVoteState';
import {Funder} from './Funder';

export class ApplicationVoteSummary {
    application: Application;
    votes: FunderVoteRepresentation[];
}

export class FunderVoteRepresentation {
    funder: Funder;
    vote: ApplicationVoteState;
}
