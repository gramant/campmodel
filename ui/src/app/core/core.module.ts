import {NgModule, Optional, SkipSelf} from '@angular/core';

import {SettingsService} from './settings/settings.service';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {FlagComponent} from '../components/flag/flag.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgxCurrencyModule} from 'ngx-currency';
import {CustomToasterService} from '../components/custom-toaster.service';
import {TranslateModule} from '@ngx-translate/core';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxCurrencyModule,
        TranslateModule,
        BsDatepickerModule,
        TimepickerModule
    ],
    providers: [
        SettingsService,
        CustomToasterService
    ],
    declarations: [
        FlagComponent,
    ],
    exports: [
        FlagComponent,
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
