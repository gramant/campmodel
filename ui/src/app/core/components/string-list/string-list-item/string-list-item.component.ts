import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    ValidationErrors,
    Validator,
    Validators
} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ConfirmDeleteModalComponent} from '../../confirm-delete-modal/confirm-delete-modal.component';
import {ErrorInItem} from '../string-list.component';

@Component({
    selector: 'app-string-list-item',
    templateUrl: './string-list-item.component.html',
    styleUrls: ['./string-list-item.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StringListItemComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => StringListItemComponent),
            multi: true,
        }
    ]
})
export class StringListItemComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
    @Input() number: number;

    @Input() messageThenDelete: string;

    @Output() errors: EventEmitter<any> = new EventEmitter();

    @Output() delete: EventEmitter<any> = new EventEmitter();

    expenseItemForm: FormGroup;

    expense: string;

    constructor(private formBuilder: FormBuilder,
                private modalService: BsModalService,
    ) {
    }

    ngOnInit(): void {
        this.expenseItemForm = this.formBuilder.group({
                name: ['', [Validators.required]],
            }
        );
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    onChange(par: any): any {
    }

    onTouched(par: any): any {
    }


    writeValue(obj: any): void {
        if (obj) {
            this.expense = obj;

            if (this.expense) {
                this.refreshForm();
            }
        }

        this.onChangeValue(null);
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
        this.onChange(this.getControl('name').value);
    }

    refreshForm() {
        this.expenseItemForm = this.formBuilder.group({
                name: [this.expense, [Validators.required]],
            }
        );
    }


    getControl(name: string): AbstractControl {
        return this.expenseItemForm.get(name);
    }

    onValid(par: any): any {
    }

    registerOnValidatorChange(fn: () => void): void {
        this.onValid = fn;
    }


    validate(control: AbstractControl): ValidationErrors | null {
        if (this.expenseItemForm.invalid) {
            this.errors.emit(new ErrorInItem(this.number, {invalidStringList: false}));
            return {invalidStringList: false};
        }

        this.errors.emit(new ErrorInItem(this.number, null));
        return null;
    }

    openDeleteOrganizer() {
        const modalRef = this.modalService.show(
            ConfirmDeleteModalComponent,
            {
                initialState: {
                    message: this.messageThenDelete,
                    submit: () => {
                        this.deleteItem(modalRef);
                    },
                },
                class: 'modal-lg',
                backdrop: 'static'
            }
        );
    }

    deleteItem(modalRef: BsModalRef) {
        modalRef.hide();
        this.errors.emit(new ErrorInItem(this.number, null));
        this.delete.emit(this.number);
    }

}
