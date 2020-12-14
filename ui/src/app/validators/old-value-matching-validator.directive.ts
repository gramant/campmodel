import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

@Directive({
    selector: '[appOldValueMatching]',
    providers: [{provide: NG_VALIDATORS, useExisting: OldValueMatchingValidatorDirective, multi: true}]

})
export class OldValueMatchingValidatorDirective implements Validator {
    @Input('appOldValueMatching') oldValue: string;

    validate(control: AbstractControl): ValidationErrors | null {
        return oldValueMatchingValidator(this.oldValue);
    }
}

export function oldValueMatchingValidator(oldValue: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value as string;
        let res = false;
        if (value) {
            res = oldValue.toUpperCase() === value.toUpperCase();
        }
        return res ? {oldValueMatching: {value: control.value}} : null;
    };
}
