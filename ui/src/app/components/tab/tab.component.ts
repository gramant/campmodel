import {Component, Input, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

    @Input()
    name: string;

    @Input()
    active: Observable<boolean> = of(false);


    constructor() {
    }

    ngOnInit(): void {
    }

}
