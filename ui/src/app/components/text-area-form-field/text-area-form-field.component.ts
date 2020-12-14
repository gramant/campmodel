import {Component, forwardRef, Host, Input, OnChanges, OnInit, Optional, SimpleChanges, SkipSelf} from '@angular/core';
import {
    AbstractControl,
    ControlContainer,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {SettingsField} from '../SettingsField';

@Component({
    selector: 'app-text-area-form-field',
    templateUrl: './text-area-form-field.component.html',
    styleUrls: ['./text-area-form-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextAreaFormFieldComponent),
            multi: true,
        }
    ]
})
export class TextAreaFormFieldComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input()
    formControlName: string;

    @Input()
    rows = 3;

    @Input()
    placeholder: string;

    @Input()
    settings: SettingsField;

    control: AbstractControl;

    value = '';

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
    }

    ngOnInit(): void {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);
                this.addValidators();
            } else {
                console.warn('Missing FormControlName directive from host element of the component');
            }
        } else {
            console.warn('Can\'t find parent FormGroup directive');
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.addValidators();
    }


    private addValidators() {
        if (this.settings && this.control) {
            const validatorsToAdd: ValidatorFn[] = [];

            if (this.settings.required) {
                validatorsToAdd.push(Validators.required);
            }

            if (this.settings.maxLength) {
                validatorsToAdd.push(Validators.maxLength(this.settings.maxLength));
            }

            if (this.settings.minLength) {
                validatorsToAdd.push(Validators.minLength(this.settings.minLength));
            }

            this.control.setValidators(validatorsToAdd);
        }
    }

    getCharactersLeft(): number {
        if (this.settings && this.settings.maxLength) {
            return this.settings.maxLength - this.value.length;
        }

        return 0;
    }

    onChange(par: any): any {
    }

    onTouched(par: any): any {
    }

    writeValue(obj: any): void {
        if (obj) {
            this.value = obj;
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    onChangeValue($event: Event) {
        this.onChange(this.value);
    }

    registerOnValidatorChange(fn: () => void): void {
    }

}
