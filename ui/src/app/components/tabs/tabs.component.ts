import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges
} from '@angular/core';
import {TabComponent} from '../tab/tab.component';
import {of} from 'rxjs';

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit, AfterContentChecked, AfterViewChecked {

    @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

    @Input()
    newTabShow = false;

    @Input()
    selectTabIndex: number;

    @Output()
    newTabClick: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {

    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    ngAfterContentInit(): void {
        this.refreshSelectTab();
        // this.tabs.changes.subscribe(value => this.refreshSelectTab());
        // this.tabs.changes.subscribe(value => this.refreshSelectTab())
    }

    ngAfterViewInit(): void {
    }

    ngAfterContentChecked(): void {
        // this.tabs.changes.subscribe(value => this.refreshSelectTab());
        // console.log("ngAfterContentInit" + this.tabs.length)
        // this.refreshSelectTab();
    }

    ngAfterViewChecked(): void {
        // console.log("ngAfterViewChecked " + this.tabs.length)
        // this.tabs.changes.subscribe(value => this.refreshSelectTab());
        // this.refreshSelectTab();
    }




    private refreshSelectTab() {
        if (this.selectTabIndex || this.selectTabIndex === 0) {
            if (this.tabs && this.tabs.toArray()[this.selectTabIndex]) {
                this.tabs.toArray()[this.selectTabIndex].active = of(true);
            }
        }
    }

    setActive(tab: TabComponent) {
        this.tabs.forEach(item => item.active = of(false));

        tab.active = of(true);
    }

    newTab() {
        this.newTabClick.emit();
    }
}
