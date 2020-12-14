export class SettingsField {
    required: boolean;
    minLength: number;
    maxLength: number;

    public static new(required: boolean,
                      minLength?: number,
                      maxLength?: number): SettingsField {
        return {required, maxLength, minLength};
    }
}
