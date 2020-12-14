import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../../../../environments/environment';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'app-switch-language',
    templateUrl: './switch-language.component.html',
    styleUrls: ['./switch-language.component.scss']
})
export class SwitchLanguageComponent implements OnInit {
    public static UK_FLAG = 'assets/img/flags/uk.png';
    public static RU_FLAG = 'assets/img/flags/russia.png';

    mapLocalesFlag: Map<string, string> = new Map([
        ['en', SwitchLanguageComponent.UK_FLAG],
        ['ru', SwitchLanguageComponent.RU_FLAG],
    ]);

    mapTitleLocalesFlag: Map<string, string> = new Map([
        ['en', 'English'],
        ['ru', 'Русский'],
    ]);

    locales: string[];
    selectedLocaleIndex: number;


    constructor(private translateService: TranslateService) {
    }

    ngOnInit(): void {
        this.locales = environment.locales;

        this.selectedLocaleIndex = this.locales.findIndex(value => value === this.translateService.currentLang);
    }


    switchLanguage() {
        if (this.locales[this.selectedLocaleIndex + 1]) {
            this.selectedLocaleIndex = this.selectedLocaleIndex + 1;
        } else {
            this.selectedLocaleIndex = 0;
        }

        this.translateService.use(this.locales[this.selectedLocaleIndex]);
        Cookie.set('locale', this.locales[this.selectedLocaleIndex], 1000, '/');
    }

    getSelectedLocalesFlagPath(): string {
        return this.mapLocalesFlag.get(this.locales[this.selectedLocaleIndex]);
    }

    getSelectedLocalesTitle(): string {
        return this.mapTitleLocalesFlag.get(this.locales[this.selectedLocaleIndex]);
    }

}
