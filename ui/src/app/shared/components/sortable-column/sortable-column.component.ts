import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Component({
    selector: 'app-sortable-column',
    templateUrl: './sortable-column.component.html'
})
export class SortableColumnComponent {

    constructor() {
    }

    @Input()
    currentSortedColumn: string;

    @Input()
    sortDirection = '';

    @Input()
    columnName: string;

    @Output()
    sortColumnClicked = new EventEmitter();

    @HostListener('click')
    sort() {
        const sortOrder = this.columnName === this.currentSortedColumn ? (this.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc';
        this.sortColumnClicked.emit({sortField: this.columnName, sortOrder});
    }

}
