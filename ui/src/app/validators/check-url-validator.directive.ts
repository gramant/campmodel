import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn} from '@angular/forms';

@Directive({
    selector: '[appCheckUrl]',
    providers: [{provide: NG_VALIDATORS, useExisting: CheckUrlValidatorDirective, multi: true}]
})
export class CheckUrlValidatorDirective {
    validate(control: AbstractControl): ValidationErrors | null {
        return checkUrl();
    }
}




export function checkUrl(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;
        let res = false;
        const reqUrl = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
        if (value) {
            res = !reqUrl.test(value);
        }
        return res ? {urlValid: {value: control.value}} : null;
    };
}


