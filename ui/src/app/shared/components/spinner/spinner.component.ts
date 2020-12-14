import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SpinnerService} from './spinner.service';

@Component({
    selector: 'app-spinner',
    template: `
        <div class="ball-pulse text-center" *ngIf="show">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <ng-content *ngIf="!show"></ng-content>
    `,
})
export class SpinnerComponent implements OnInit, OnDestroy {

    @Input() show = true;
    @Input() name = '';

    constructor(private spinnerService: SpinnerService) {
    }

    ngOnInit() {
        if (this.name) {
            this.spinnerService.register(this);
        }
    }

    ngOnDestroy() {
        if (this.name) {
            this.spinnerService.unregister(this);
        }
    }
}
