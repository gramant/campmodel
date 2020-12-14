import {Component, Input, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChangePasswordRequest} from '../../../../../domain/request/account/ChangePasswordRequest';
import {RequestStatuses} from '../../../../../components/RequestStatuses';
import {checkPasswordStrongValidator} from '../../../../../validators/check-password-strong-validator.directive';
import {controlsEqualsValidatorDirective} from '../../../../../validators/controls-equals-validator.directive';

@Component({
    selector: 'app-change-password-modal',
    templateUrl: './change-password-modal.component.html',
    styleUrls: ['./change-password-modal.component.scss']
})
export class ChangePasswordModalComponent implements OnInit {

    @Input()
    submit: any;

    @Input()
    passwordRequestStat: RequestStatuses;

    updateForm: FormGroup;


    constructor(public bsModalRef: BsModalRef,
    ) {

    }

    ngOnInit(): void {
        this.updateForm = new FormGroup({
            password: new FormControl('', [Validators.required, checkPasswordStrongValidator()]),
            repeatPassword: new FormControl('', Validators.required),
        }, {validators: controlsEqualsValidatorDirective('password', 'repeatPassword')});
    }

    close() {
        this.bsModalRef.hide();
    }

    submitRequest() {
        const rq: ChangePasswordRequest = {
            password: this.getControl('password').value
        };

        this.submit(rq);
    }


    getControl(name: string) {
        return this.updateForm.get(name);
    }

}

