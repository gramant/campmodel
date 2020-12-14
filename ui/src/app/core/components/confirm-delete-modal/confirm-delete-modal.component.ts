import {Component, Input} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-confirm-delete-modal',
    templateUrl: './confirm-delete-modal.component.html',
    styleUrls: ['./confirm-delete-modal.component.scss']
})
export class ConfirmDeleteModalComponent {

    @Input()
    message: string;

    @Input()
    submit: any;

    constructor(public bsModalRef: BsModalRef) {
    }

    submitRequest() {
        this.submit(true);
    }

    close() {
        this.bsModalRef.hide();
    }
}
