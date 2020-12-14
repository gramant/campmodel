import {CountryCode} from './Country';
import {UserRefRepresentation} from './UserRefRepresentation';

export type FunderId = string;

export class Funder {
    id: FunderId;
    name: string;
    countryCode: CountryCode;
    reps: UserRefRepresentation[];
}
