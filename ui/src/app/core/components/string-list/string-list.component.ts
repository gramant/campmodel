import {Component, forwardRef, Host, Input, OnChanges, OnInit, Optional, SimpleChanges, SkipSelf} from '@angular/core';
import {
    AbstractControl,
    ControlContainer,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator
} from '@angular/forms';

@Component({
    selector: 'app-string-list',
    templateUrl: './string-list.component.html',
    styleUrls: ['./string-list.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StringListComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => StringListComponent),
            multi: true,
        }
    ]
})
export class StringListComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
    @Input() formControlName: string;

    @Input() textInAddedButton: string;

    @Input() maxItems: number;

    @Input() messageThenDelete: string;

    control: AbstractControl;
    items: Element[];

    errors: any;

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

    }

    onChange(par: any): any {
    }

    onTouched(par: any): any {
    }


    writeValue(obj: any): void {
        if (obj) {
            const newValues: string[] = obj;
            const values: Element[] = [];
            for (let i = 0; i < newValues.length; i++) {
                values.push(new Element(i, newValues[i]));
            }

            this.items = values;

            if (values.length === 0) {
                this.addNewElem();
            }
        } else {
            this.items = [];
            this.addNewElem();
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
        this.onChange(this.items.map(value => value.value));
    }


    onValid(par: any): any {
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onValid = fn;
    }


    validate(control: AbstractControl): ValidationErrors | null {
        if (this.errors) {
            return {invalidStringList: false};
        }

        if (!this.items || (this.items && this.items.length === 0)) {
            return {required: 'required'};
        }

        return null;
    }

    addNewElem() {
        if (!this.maxItems || (this.items.length <= this.maxItems)) {
            this.items.push(new Element(this.items.length, ''));
            this.onChangeValue(null);
        } else {
            console.warn('Max count elements');
        }
    }

    isPossibilityNewElem(): boolean {
        return !this.maxItems || this.items.length < this.maxItems;
    }

    onDelete(index: number) {
        let elements = [];

        if (this.items) {
            elements = this.items.filter(value => value.index !== index);
        }

        this.items = [];
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            element.index = i;

            this.items.push(element);
        }

        this.onChangeValue(null);
    }

    onErrorInItem(errorInItem: ErrorInItem) {
        this.items.find(value => value.index === errorInItem.index).errors = errorInItem.errors;

        this.refreshErrors();
    }

    private refreshErrors() {
        const errorArray = this.items.filter(value => !!value.errors).map(value => value.errors);

        if (errorArray.length === 0) {
            this.errors = null;
        } else {
            this.errors = errorArray;
        }
    }

}


export class Element {
    index: number;
    value: string;
    errors: any;

    constructor(index: number, value: string) {
        this.index = index;
        this.value = value;
        this.errors = null;
    }
}


export class ErrorInItem {
    index: number;
    errors: any;


    constructor(index: number, errors: any) {
        this.index = index;
        this.errors = errors;
    }
}
