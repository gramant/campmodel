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
    selector: 'app-select-oval-item',
    templateUrl: './select-oval-item.component.html',
    styleUrls: ['./select-oval-item.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectOvalItemComponent),
            multi: true,
        }
    ]
})
export class SelectOvalItemComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input() formControlName: string;

    @Input()
    settings: SettingsField;

    @Input()
    itemsForSelect: any[];

    @Input()
    getTitleFunction: Function;

    @Input()
    getValueFunction: Function;

    control: AbstractControl;

    value = null;

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

    onChange(obj: any): any {
        this.value = obj;
    }

    onTouched(par: any): any {
    }

    writeValue(obj: any): void {
        this.value = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
    }

    onChangeValue(item: string) {
        this.value = this.getValue(item);
        this.onChange(this.value);
    }

    registerOnValidatorChange(fn: () => void): void {
    }

    getTitle(item: any) {
        if (this.getTitleFunction) {
            return this.getTitleFunction(item);
        } else {
            return item;
        }
    }

    getValue(item: any) {
        if (this.getValueFunction) {
            return this.getValueFunction(item);
        } else {
            return item;
        }
    }
}
