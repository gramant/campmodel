import {Component, forwardRef, Host, Input, OnChanges, OnInit, Optional, SimpleChanges, SkipSelf} from '@angular/core';
import {
    AbstractControl,
    ControlContainer,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    ValidatorFn,
    Validators
} from '@angular/forms';
import {catchError, debounceTime, map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-input-acronym-field',
    templateUrl: './input-acronym-field.component.html',
    styleUrls: ['./input-acronym-field.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputAcronymFieldComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputAcronymFieldComponent),
            multi: true,
        }
    ]
})
export class InputAcronymFieldComponent implements OnInit, OnChanges, ControlValueAccessor {
    MAX_LENGTH = 20;
    DEFAULT_PATTERN = '[0-9a-zA-Z_\\-]';

    @Input() formControlName: string;

    @Input() checkExists: any;

    @Input() debounceDuration = 1000;

    @Input() errorMessage: string;

    @Input() pattern = this.DEFAULT_PATTERN;

    control: AbstractControl;

    value = '';

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
    }

    ngOnInit(): void {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);
                this.addValidators();
                this.addCheckFunction();
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
        if (this.control) {
            const validatorsToAdd: ValidatorFn[] = [];

            validatorsToAdd.push(Validators.required);

            validatorsToAdd.push(Validators.maxLength(this.MAX_LENGTH));

            this.control.setValidators(validatorsToAdd);
        }
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


    getCharactersLeft(): number {
        if (this.value) {
            return this.MAX_LENGTH - this.value.length;
        } else {
            return this.MAX_LENGTH;
        }
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
        return null;
    }

    keyPress(event: KeyboardEvent) {
        const pattern = new RegExp(this.pattern);

        if (!pattern.test(event.key) && event.code !== '0') {
            event.preventDefault();
        }
    }

}
