import {NgModule, Optional, SkipSelf} from '@angular/core';

import {SettingsService} from './settings/settings.service';
import {ThemesService} from './themes/themes.service';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {FlagComponent} from './flag/flag.component';
import {CommonModule} from '@angular/common';
import {TextAreaFormFieldComponent} from './components/text-area-form-field/text-area-form-field.component';
import {FormsModule} from '@angular/forms';
import {CheckedFormFieldComponent} from './components/checked-form-field/checked-form-field.component';
import {AccordionComponent} from './components/accordion/accordion.component';
import {CurrencyInputFormFieldComponent} from './components/currency-input-form-field/currency-input-form-field.component';
import {NgxCurrencyModule} from 'ngx-currency';
import {InputFormFieldComponent} from './components/input-form-field/input-form-field.component';
import {TabsComponent} from './components/tabs/tabs.component';
import {TabComponent} from './components/tab/tab.component';
import {ConfirmDeleteModalComponent} from './components/confirm-delete-modal/confirm-delete-modal.component';
import {CustomToasterService} from './custom-toaster.service';
import {SelectOvalItemComponent} from './components/select-oval-item/select-oval-item.component';
import {RadioGroupComponent} from './components/radio-group/radio-group.component';
import {InputAcronymFieldComponent} from './components/input-acronym-field/input-acronym-field.component';
import {TranslateModule} from '@ngx-translate/core';
import {SwitchLanguageComponent} from './components/switch-language/switch-language.component';
import {InputFormFieldUniqueCheckComponent} from './components/input-form-field-unique-check/input-form-field-unique-check.component';
import {ButtonPannelsComponent} from './components/button-pannels/button-pannels.component';
import {ConfirmInfoModalComponent} from './components/confim-info-modal/confirm-info-modal.component';
import {DateTimePickerComponent} from './components/date-time-picker/date-time-picker.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {StringListItemComponent} from './components/string-list/string-list-item/string-list-item.component';

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
        ThemesService,
        CustomToasterService
    ],
    declarations: [
        FlagComponent,
        TextAreaFormFieldComponent,
        InputFormFieldComponent,
        CheckedFormFieldComponent,
        AccordionComponent,
        CurrencyInputFormFieldComponent,
        TabsComponent,
        TabComponent,
        ConfirmDeleteModalComponent,
        SelectOvalItemComponent,
        RadioGroupComponent,
        InputAcronymFieldComponent,
        SwitchLanguageComponent,
        InputFormFieldUniqueCheckComponent,
        ButtonPannelsComponent,
        ConfirmInfoModalComponent,
        DateTimePickerComponent,
    ],
    exports: [
        FlagComponent,
        TextAreaFormFieldComponent,
        InputFormFieldComponent,
        CheckedFormFieldComponent,
        AccordionComponent,
        CurrencyInputFormFieldComponent,
        TabsComponent,
        TabComponent,
        SelectOvalItemComponent,
        RadioGroupComponent,
        InputAcronymFieldComponent,
        SwitchLanguageComponent,
        InputFormFieldUniqueCheckComponent,
        DateTimePickerComponent,
        StringListItemComponent
    ]
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
