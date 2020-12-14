import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn} from '@angular/forms';

@Directive({
    selector: '[appCheckPasswordStrong]',
    providers: [{provide: NG_VALIDATORS, useExisting: CheckPasswordStrongValidatorDirective, multi: true}]
})
export class CheckPasswordStrongValidatorDirective {
    validate(control: AbstractControl): ValidationErrors | null {
        return checkPasswordStrongValidator();
    }
}

export function checkPasswordStrongValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;
        let res = false;
        const reqExpStrongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (value) {
            res = !reqExpStrongPassword.test(value);
        }
        return res ? {passwordStrong: {value: control.value}} : null;
    };
}


