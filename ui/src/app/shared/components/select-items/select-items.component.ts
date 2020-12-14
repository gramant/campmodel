import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const SELECT_ITEMS_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectItemsComponent),
    multi: true,
};

@Component({
    selector: 'app-select-items',
    providers: [SELECT_ITEMS_VALUE_ACCESSOR],
    templateUrl: './select-items.component.html',
    styleUrls: ['./select-items.component.scss']
})
export class SelectItemsComponent implements ControlValueAccessor {

    @Input() target: any;
    @Input() availableItems: any[];
    @Input() itemStyles: any = {};
    @Input() itemsPropName = 'items';
    @Input() itemIdPropName = 'id';
    @Input() itemLabelPropName = 'name';
    @Input() translatePrefix;
    @Input() addButtonText: string;
    @Input() readOnly = false;
    @Input() excludeSelected = false;

    @Output() addItem = new EventEmitter<any>();
    @Output() deleteItem = new EventEmitter<any>();

    private onChangeFn: any;

    constructor() {
    }

    onAddItem(item: any) {
        this.addItem.emit(item);
        if (this.onChangeFn) {
            this.onChangeFn(this.target[this.itemsPropName]);
        }
    }

    onDeleteItem(item: any) {
        this.deleteItem.emit(item);
        if (this.onChangeFn) {
            this.onChangeFn(this.target[this.itemsPropName]);
        }
    }

    getAvailableItems(): any {
        if (this.target[this.itemsPropName] && this.excludeSelected) {
            return this.availableItems.filter(item => this.target[this.itemsPropName]
                .find(i => item.id ? i.id === item.id : i === item) === undefined);
        } else {
            return this.availableItems;
        }
    }

    canAddMore(): boolean {
        if (this.readOnly) {
            return false;
        }
        if (this.excludeSelected) {
            return (this.availableItems && !this.target[this.itemsPropName]) ||
                (this.availableItems && this.target[this.itemsPropName].length < this.availableItems.length);
        } else {
            return !!(this.availableItems && this.availableItems.length);
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
        this.readOnly = isDisabled;
    }

    writeValue(obj: any): void {
        this.target[this.itemsPropName] = obj;
    }

    getItemLabel(item: any): string {
        return item[this.itemLabelPropName] || item;
    }
}



