import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnChanges {

    @Input() title: string;

    @Input() active = false;

    @Input() key: any;

    @Input() toggleAccordionNotKey: any;

    @Output() toggleAccordion: EventEmitter<boolean> = new EventEmitter();
    @Output() toggleAccordionKey: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.toggleAccordionNotKey) {
            this.active = this.toggleAccordionNotKey === this.key;
        } else {
            this.active = false;
        }
    }


    onClick(event) {
        event.preventDefault();
        this.toggleAccordion.emit(this.active);
        this.toggleAccordionKey.emit(this.key);
    }
}
