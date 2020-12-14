import {Component, forwardRef, Host, Input, OnChanges, OnInit, Optional, SimpleChanges, SkipSelf} from '@angular/core';
import {
    AbstractControl,
    ControlContainer,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {SettingsField} from '../../../main/application/settings/Settings';

@Component({
    selector: 'app-checked-form-field',
    templateUrl: './checked-form-field.component.html',
    styleUrls: ['./checked-form-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckedFormFieldComponent),
            multi: true,
        }
    ]
})
export class CheckedFormFieldComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input() formControlName: string;

    @Input()
    settings: SettingsField;

    control: AbstractControl;

    values: CheckElement[];

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

            this.control.setValidators(validatorsToAdd);
        }
    }


    onChange(par: any): any {
    }

    onTouched(par: any): any {
    }

    writeValue(obj: any): void {
        if (obj) {
            this.values = obj;
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
        this.onChange(this.values);
        this.onTouched(this.values);
    }

    registerOnValidatorChange(fn: () => void): void {
    }
}

export class CheckElement {
    isChecked: boolean;
    key: any;
    titleKey: string;


    constructor(isChecked: boolean, key: any, titleKey: string) {
        this.isChecked = isChecked;
        this.key = key;
        this.titleKey = titleKey;
    }
}
