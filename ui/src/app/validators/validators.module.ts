import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CheckPasswordStrongValidatorDirective} from './check-password-strong-validator.directive';
import {ControlsEqualsValidatorDirective} from './controls-equals-validator.directive';
import {OldValueMatchingValidatorDirective} from './old-value-matching-validator.directive';
import {CheckUrlValidatorDirective} from './check-url-validator.directive';


@NgModule({
    imports: [

    ],
    exports: [
        RouterModule
    ],
    declarations: [
        CheckPasswordStrongValidatorDirective,
        ControlsEqualsValidatorDirective,
        OldValueMatchingValidatorDirective,
        CheckUrlValidatorDirective
    ]
})

export class ValidatorsModule {
    constructor() {
    }
}
