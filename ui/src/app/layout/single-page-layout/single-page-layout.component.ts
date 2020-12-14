import {Component, OnDestroy, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-single-page-layout',
    templateUrl: './single-page-layout.component.html',
    styleUrls: ['./single-page-layout.component.scss']
})
export class SinglePageLayoutComponent implements OnInit, OnDestroy {

    constructor() {
    }

    ngOnInit() {
        $("body").addClass("c-single-page-layout");
    }

    ngOnDestroy(): void {
        $("body").removeClass("c-single-page-layout");
    }

}
