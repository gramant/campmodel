import {Organization} from './Organization';
import {ApplicationCoordinator} from './ApplicationCoordinator';
import {FinancialPlan} from './FinancialPlan';
import {UserId} from './User';

export class Applicant {
    id: UserId;
    name: string;
    email: string;
    organization: Organization;
    coordinator: ApplicationCoordinator;
    plan: FinancialPlan;
    createdAt: Date;
    joinedOn: Date;


    constructor(id: string, name: string, email: string, organization: Organization, coordinator: ApplicationCoordinator, plan: FinancialPlan, createdAt: Date, joinedOn: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.organization = organization;
        this.coordinator = coordinator;
        this.plan = plan;
        this.createdAt = createdAt;
        this.joinedOn = joinedOn;
    }

    public static parse(value: Applicant): Applicant {
        value.createdAt = new Date(value.createdAt);
        value.joinedOn = new Date(value.joinedOn);

        value.coordinator = value ? ApplicationCoordinator.parse(value.coordinator) : null;

        return value;
    }
}
