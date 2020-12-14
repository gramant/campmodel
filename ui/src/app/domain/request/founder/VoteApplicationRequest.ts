import {Vote} from '../../Vote';

export class VoteApplicationRequest {
    vote: Vote;

    constructor(vote: Vote) {
        this.vote = vote;
    }
}
