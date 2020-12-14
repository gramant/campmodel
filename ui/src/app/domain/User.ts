import {Role} from './Role';
import {CountryCode} from './Country';

export type UserId = string;

export class User {
    id: UserId;
    email: string;
    name: string;

    createdAt: Date;
    joinedOn: Date;

    enabled: boolean;
    accountNonLocked: boolean;
    accountFilled: boolean;

    countryCode: CountryCode;
    roles: Role[];

    public static parse(value: User): User {
        value.createdAt = new Date(value.createdAt);
        value.joinedOn = new Date(value.joinedOn);

        return value;
    }

    public static isUserHasRole(role: Role, currentUser: User) {
        return !!(currentUser.roles.find(value1 => value1 === role));
    }
}


