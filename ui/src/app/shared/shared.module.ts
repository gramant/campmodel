import {ColorsService} from './colors/colors.service';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {SortableColumnComponent} from './components/sortable-column/sortable-column.component';
import {SelectItemsComponent} from './components/select-items/select-items.component';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {AlertModule} from 'ngx-bootstrap/alert';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {CarouselModule} from 'ngx-bootstrap/carousel';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BsDatepickerModule, DatepickerModule} from 'ngx-bootstrap/datepicker';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ModalModule} from 'ngx-bootstrap/modal';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {RatingModule} from 'ngx-bootstrap/rating';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {PopoverModule} from 'ngx-bootstrap/popover';
import {TypeaheadModule} from 'ngx-bootstrap/typeahead';
import {RouterModule} from '@angular/router';

// https://angular.io/styleguide#!#04-10
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AccordionModule.forRoot(),
        AlertModule.forRoot(),
        ButtonsModule.forRoot(),
        CarouselModule.forRoot(),
        CollapseModule.forRoot(),
        DatepickerModule.forRoot(),
        BsDatepickerModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        ProgressbarModule.forRoot(),
        RatingModule.forRoot(),
        TabsModule.forRoot(),
        TimepickerModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        TypeaheadModule.forRoot(),
    ],
    providers: [
        ColorsService
    ],
    declarations: [
        SpinnerComponent,
        SortableColumnComponent,
        SelectItemsComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        AccordionModule,
        AlertModule,
        ButtonsModule,
        CarouselModule,
        CollapseModule,
        DatepickerModule,
        BsDatepickerModule,
        BsDropdownModule,
        ModalModule,
        PaginationModule,
        ProgressbarModule,
        RatingModule,
        TabsModule,
        TimepickerModule,
        TooltipModule,
        PopoverModule,
        TypeaheadModule,
        SpinnerComponent,
        SortableColumnComponent,
        SelectItemsComponent,
    ]
})

// https://github.com/ocombe/ng2-translate/issues/209
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule
        };
    }
}
