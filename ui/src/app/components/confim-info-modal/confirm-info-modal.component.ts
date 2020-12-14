import {Component, Input} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-info-modal',
  templateUrl: './confirm-info-modal.component.html',
  styleUrls: ['./confirm-info-modal.component.scss']
})
export class ConfirmInfoModalComponent {

    @Input()
    message: string;

    @Input()
    submit: any;

    constructor( public bsModalRef: BsModalRef) {
    }

    submitRequest() {
        this.submit(true);
    }

    close() {
        this.bsModalRef.hide();
    }

}
