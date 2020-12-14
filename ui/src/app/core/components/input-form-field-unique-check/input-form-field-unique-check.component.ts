import {Component, forwardRef, Host, Input, OnChanges, OnInit, Optional, SimpleChanges, SkipSelf} from '@angular/core';
import {
    AbstractControl,
    ControlContainer,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors
} from '@angular/forms';
import {catchError, debounceTime, map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-input-form-field-unique-check',
    templateUrl: './input-form-field-unique-check.component.html',
    styleUrls: ['./input-form-field-unique-check.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputFormFieldUniqueCheckComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputFormFieldUniqueCheckComponent),
            multi: true,
        }
    ]
})
export class InputFormFieldUniqueCheckComponent implements OnInit, OnChanges, ControlValueAccessor {
    @Input() formControlName: string;

    @Input() checkExists: any;

    @Input() errorText: string;

    @Input() debounceDuration = 1000;

    control: AbstractControl;

    value = '';

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
    }

    ngOnInit(): void {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);
                this.addCheckFunction();
            } else {
                console.warn('Missing FormControlName directive from host element of the component');
            }
        } else {
            console.warn('Can\'t find parent FormGroup directive');
        }
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    private addCheckFunction() {
        this.control.valueChanges
            .pipe(
                debounceTime(this.debounceDuration),
                tap(x => {
                    this.checkExists(this.value).pipe(
                        map(value => {
                            if (value) {
                                this.control.setErrors({exists: {value: this.control.value}});
                                return {exists: {value: this.control.value}};
                            }
                        }),
                        catchError(err => {
                            throw err;
                        }),
                    ).subscribe();
                })
            )
            .subscribe();
    }

    onChange(obj: any): any {

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

    onChangeValue($event: Event) {

        this.onChange(this.value);
    }

    onValid(par: any): any {
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onValid = fn;
    }

    validate(control: AbstractControl): ValidationErrors | null {
        // if (this..invalid) {
        //     return {invalidOrganization: false};
        // }


        return null;
    }


}
