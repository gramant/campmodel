import {Sex} from './Sex';

export class ApplicationCoordinator {
    person: Person;
    qualification: string;
    publications: string[];

    public static parse(value: ApplicationCoordinator): ApplicationCoordinator {
        if (value) {
            value.person = value.person ? Person.parse(value.person) : null;
        }

        return value;
    }

    public static empty(): ApplicationCoordinator {
        return {
            person: Person.empty(),
            qualification: '',
            publications: []
        };
    }
}

export class Person {
    name: Name;
    sex: Sex;
    birthDate: Date;
    phoneNumber: string;
    email: string;

    public static parse(value: Person): Person {
        if (value) {
            value.birthDate = new Date(value.birthDate);
        }

        return value;
    }

    public static empty(): Person {
        return {
            name: Name.empty(),
            sex: null,
            birthDate: null,
            phoneNumber: '',
            email: ''
        };

    }
}

export class Name {
    first: string;
    last: string;
    middle: string;

    public static empty(): Name {
        return {
            first: '',
            last: '',
            middle: ''
        };
    }
}
