import {Directive, Input} from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

@Directive({
    selector: '[appControlEqualsValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: ControlsEqualsValidatorDirective, multi: true}]

})
export class ControlsEqualsValidatorDirective implements Validator {
    @Input('appControlEqualsValidator') firstNameControlToEqual: string;
    @Input('appControlEqualsValidator') secondNameControlToEqual: string;

    validate(control: AbstractControl): ValidationErrors | null {
        return controlsEqualsValidatorDirective(this.firstNameControlToEqual, this.secondNameControlToEqual);
    }
}

export function controlsEqualsValidatorDirective(firstNameControlToEqual: string, secondNameControlToEqual: string): ValidatorFn {
    return (control: FormGroup): ValidationErrors | null => {
        // const root = control.root as FormGroup;
        const valueToEqual = control.get(firstNameControlToEqual).value;
        const value = control.get(secondNameControlToEqual).value;
        let res = false;
        if (value) {
            res = valueToEqual !== value;
        }
        return res ? {controlsEquals: {value: control.value}} : null;
    };
}

