export enum Sex {
    M = 'M',
    F = 'F'
}

export class SexTitleWithValue {
    value: string;
    title: string;

    static getSexValueWithTitle(): SexTitleWithValue[] {
        return [
            {value: String(Sex.M), title: 'Male'},
            {value: String(Sex.F), title: 'Female'},
        ];
    }

    static getTitle(sexTitleWithValue: SexTitleWithValue): string {
        return sexTitleWithValue.title;
    }

    static getValue(sexTitleWithValue: SexTitleWithValue): string {
        return sexTitleWithValue.value;
    }
}
