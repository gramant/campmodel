import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    static getObjectKeyByValue(obj: any, value: string) {
        for (const key of Object.keys(obj)) {
            if (obj[key] === value) {
                return key;
            }
        }
        return null;
    }

    static assignNonNullProps(target: any, ...sources: any): any {
        if (!sources || !sources.length) {
            return;
        }
        for (const source of sources) {
            if (source) {
                for (const key of Object.keys(source)) {
                    const value = source[key];
                    if (value != null) {
                        target[key] = value;
                    }
                }
            }
        }
    }

    static getErrorText(error: any): string {
        if (error) {
            if (error.error) {
                if (error.error.message) {
                    return error.error.message;
                } else if (error.error.error) {
                    return error.error.error;
                }
            } else {
                if (error.message) {
                    return error.message;
                }
            }
        }

        return '';
    }
}
