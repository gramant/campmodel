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
    selector: 'app-radio-group',
    templateUrl: './radio-group.component.html',
    styleUrls: ['./radio-group.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioGroupComponent),
            multi: true,
        }
    ]
})
export class RadioGroupComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input() formControlName: string;

    @Input()
    settings: SettingsField;

    @Input()
    items: string[];

    control: AbstractControl;

    value = null;

    radioValue = null;

    userValue = null;

    userValueRadio = null;

    isRadioValue: boolean;
    isRadioUserValue: boolean;

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

    onChange(obj: any): any {

    }

    onTouched(par: any): any {
    }

    writeValue(obj: any): void {
        if (obj) {
            if (this.items) {
                const finds = this.items.find(value1 => {
                    return value1 === String(obj);
                });

                let find = null;
                if (finds) {
                    find = finds[0];
                }

                if (find) {
                    this.radioValue = String(obj);
                    this.value = this.radioValue;
                } else {
                    this.userValue = String(obj);
                    this.value = this.userValue;
                    this.userValueRadio = 'other';
                }
            }
        } else {
            this.radioValue = null;
            this.userValue = null;
            this.value = null;
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
        if (this.isRadioUserValue) {
            this.value = this.userValue;
        } else if (this.isRadioValue) {
            this.value = this.radioValue;
        }

        this.onChange(this.value);
    }

    registerOnValidatorChange(fn: () => void): void {
    }

    onChangeRadioUserValue($event: any) {
        this.isRadioValue = false;
        this.isRadioUserValue = true;
        this.userValueRadio = 'other';

        this.onChangeValue($event);
    }

    onChangeRadioValue($event: any) {
        this.isRadioValue = true;
        this.isRadioUserValue = false;
        this.userValueRadio = null;

        this.radioValue = $event;

        this.onChangeValue($event);
    }

    onChangeUserValue($event: any) {
        this.userValue = $event;

        this.onChangeValue($event);
    }

    onFocusRadioUserValueIn($event: FocusEvent) {
        this.isRadioValue = false;
        this.isRadioUserValue = true;

        this.userValueRadio = 'other';

        this.onChangeValue($event);
    }
}
