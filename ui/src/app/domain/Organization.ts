import {Country} from './Country';

export class Organization {
    title: string;
    abbreviation: string;
    type: string;
    department: string;
    countryCode: Country;
    address: string;

    public static empty(): Organization {
        return {
            title: '',
            abbreviation: '',
            type: '',
            department: '',
            countryCode: null,
            address: '',
        };
    }
}
