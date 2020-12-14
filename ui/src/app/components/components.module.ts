import {NgModule, Optional, SkipSelf} from '@angular/core';

import {SettingsService} from './settings/settings.service';
import {ThemesService} from './themes/themes.service';
import {FlagComponent} from './flag/flag.component';
import {TextAreaFormFieldComponent} from './text-area-form-field/text-area-form-field.component';
import {InputFormFieldComponent} from './input-form-field/input-form-field.component';
import {CheckedFormFieldComponent} from './checked-form-field/checked-form-field.component';
import {AccordionComponent} from './accordion/accordion.component';
import {CurrencyInputFormFieldComponent} from './currency-input-form-field/currency-input-form-field.component';
import {TabsComponent} from './tabs/tabs.component';
import {TabComponent} from './tab/tab.component';
import {ConfirmDeleteModalComponent} from './confirm-delete-modal/confirm-delete-modal.component';
import {SelectOvalItemComponent} from './select-oval-item/select-oval-item.component';
import {RadioGroupComponent} from './radio-group/radio-group.component';
import {InputAcronymFieldComponent} from './input-acronym-field/input-acronym-field.component';
import {SwitchLanguageComponent} from './switch-language/switch-language.component';
import {InputFormFieldUniqueCheckComponent} from './input-form-field-unique-check/input-form-field-unique-check.component';
import {ButtonPannelsComponent} from './button-pannels/button-pannels.component';
import {ConfirmInfoModalComponent} from './confim-info-modal/confirm-info-modal.component';
import {DateTimePickerComponent} from './date-time-picker/date-time-picker.component';
import {CustomToasterService} from './custom-toaster.service';
import {StringListItemComponent} from './string-list/string-list-item/string-list-item.component';


@NgModule({
    imports: [
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
export class ComponentsModule {
    constructor() {
    }
}
