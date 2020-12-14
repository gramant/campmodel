import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../domain/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {RequestStatuses} from '../../../components/RequestStatuses';
import {InviteAdministratorRequest} from '../../../domain/request/InviteAdministratorRequest';

@Component({
    selector: 'app-invite-user-administrator-modal',
    templateUrl: './invite-user-administrator-modal.component.html',
    styleUrls: ['./invite-user-administrator-modal.component.scss']
})
export class InviteUserAdministratorModalComponent implements OnInit {

    @Input() user: User;

    @Input() submit: any;

    inviteAdministratorRequestStat: RequestStatuses;

    updateForm: FormGroup;

    constructor(public bsModalRef: BsModalRef,
                private formBuilder: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.updateForm = this.formBuilder.group({
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
            }
        );
    }

    close() {
        this.bsModalRef.hide();
    }

    submitRequest() {
        const inviteSupportRequest: InviteAdministratorRequest = {
            email: this.getControl('email').value,
            name: this.getControl('name').value,
        };

        this.submit(inviteSupportRequest);
    }

    getControl(name: string) {
        return this.updateForm.get(name);
    }
}
