import {
    ChangeDetectionStrategy,
    Component, EventEmitter,
    forwardRef,
    Host,
    Input,
    OnChanges,
    OnInit,
    Optional,
    Output,
    SimpleChanges,
    SkipSelf
} from '@angular/core';
import {
    AbstractControl,
    ControlContainer,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors
} from '@angular/forms';

@Component({
    selector: 'app-date-time-picker',
    templateUrl: './date-time-picker.component.html',
    styleUrls: ['./date-time-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateTimePickerComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DateTimePickerComponent),
            multi: true,
        }
    ]
})
export class DateTimePickerComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input() formControlName: string;

    @Input() minDate: Date;
    @Input() maxDate: Date;

    @Input() minDateWarning: Date;
    @Input() maxDateWarning: Date;

    @Input() minDateWarningMessage: Date;
    @Input() maxDateWarningMessage: Date;

    @Input() minDateWarningWithMessage: DateWithMessage[] = [];
    @Input() maxDateWarningWithMessage: DateWithMessage[] = [];

    @Output() changeDate = new EventEmitter<Date>();

    isErrorMinDateWarning: boolean;
    isErrorMaxDateWarning: boolean;

    minDateWarningWithMessageValid: DateWithMessageValid[] = [];
    maxDateWarningWithMessageValid: DateWithMessageValid[] = [];

    control: AbstractControl;

    value: any;

    valueDate: Date;
    valueTime: Date;

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
    }

    ngOnInit(): void {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);
            } else {
                console.warn('Missing FormControlName directive from host element of the component');
            }
        } else {
            console.warn('Can\'t find parent FormGroup directive');
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.minDateWarning
            && (changes.minDateWarning.currentValue !== changes.minDateWarning.previousValue)) {
            this.checkMinMaxWarning();
        }

        if (changes.maxDateWarning
            && (changes.maxDateWarning.currentValue !== changes.maxDateWarning.previousValue)) {
            this.checkMinMaxWarning();
        }

        if (changes.minDateWarningWithMessage
            && (changes.minDateWarningWithMessage.currentValue !== changes.minDateWarningWithMessage.previousValue)) {
            this.checkMinMaxWarning();
        }

        if (changes.maxDateWarningWithMessage
            && (changes.maxDateWarningWithMessage.currentValue !== changes.maxDateWarningWithMessage.previousValue)) {
            this.checkMinMaxWarning();
        }
    }

    onChange(obj: any): any {

    }

    onTouched(par: any): any {
    }

    writeValue(obj: any): void {
        this.value = obj;
        this.valueDate = this.value;
        this.valueTime = this.value;
        this.checkMinMaxWarning();
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
        if (this.valueDate && this.valueTime) {
            this.value = new Date(this.valueDate.getFullYear(), this.valueDate.getMonth(), this.valueDate.getDate(),
                this.valueTime.getHours(), this.valueTime.getMinutes(), this.valueTime.getSeconds());
            this.onChange(this.value);
            this.checkMinMaxWarning();
            this.changeDate.emit(this.value);
        }
    }

    onChangeValueDate($event: Event) {
        if (this.valueDate && !this.valueTime) {
            const oldDate = this.valueDate as Date;
            this.valueTime = new Date(oldDate.getFullYear(), oldDate.getMonth(), oldDate.getDate(), 12, 0, 0);
        }
        this.onChangeValue($event);
    }

    onChangeValueTime($event: Event) {
        this.onChangeValue($event);
    }

    public checkMinMaxWarning() {
        if (this.value) {

            if (this.minDateWarning) {
                this.isErrorMinDateWarning = this.value < this.minDateWarning;
            }

            if (this.maxDateWarning) {
                this.isErrorMaxDateWarning = this.value > this.maxDateWarning;
            }

            if (this.minDateWarningWithMessage.length !== 0) {
                this.minDateWarningWithMessageValid = [];
                for (const dateWithMessage of this.minDateWarningWithMessage) {
                    if (!dateWithMessage.date) {
                        this.minDateWarningWithMessageValid
                            .push(new DateWithMessageValid(dateWithMessage, true));
                    } else {
                        this.minDateWarningWithMessageValid
                            .push(new DateWithMessageValid(dateWithMessage, this.value > dateWithMessage.date));
                    }
                }
            }

            if (this.maxDateWarningWithMessage.length !== 0) {
                this.maxDateWarningWithMessageValid = [];
                for (const dateWithMessage of this.maxDateWarningWithMessage) {
                    if (!dateWithMessage.date) {
                       this.maxDateWarningWithMessageValid
                           .push(new DateWithMessageValid(dateWithMessage, true));
                    } else {
                        this.maxDateWarningWithMessageValid
                            .push(new DateWithMessageValid(dateWithMessage,  this.value < dateWithMessage.date));
                    }
                }

            }
        }
    }

    onValid(par: any): any {
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onValid = fn;
    }

    validate(control: AbstractControl): ValidationErrors | null {
        return null;
    }

}

export class DateWithMessage {
    date: Date;
    message: string;

    public static create(date: Date, message: string): DateWithMessage {
        return new DateWithMessage(date, message);
    }

    constructor(date: Date, message: string) {
        this.date = date;
        this.message = message;
    }
}

class DateWithMessageValid {
    dateWithMessage: DateWithMessage;
    isValid: boolean;

    constructor(dateWithMessage: DateWithMessage, isValid: boolean) {
        this.dateWithMessage = dateWithMessage;
        this.isValid = isValid;
    }
}
