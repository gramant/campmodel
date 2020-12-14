import {Component, HostBinding, OnInit} from '@angular/core';

import {SettingsService} from './core/settings/settings.service';
import {ToasterConfig} from 'angular2-toaster';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {Cookie} from 'ng2-cookies/ng2-cookies';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @HostBinding('class.layout-fixed') get isFixed() {
        return this.settings.getLayoutSetting('isFixed');
    }

    @HostBinding('class.aside-collapsed') get isCollapsed() {
        return this.settings.getLayoutSetting('isCollapsed');
    }

    @HostBinding('class.layout-boxed') get isBoxed() {
        return this.settings.getLayoutSetting('isBoxed');
    }

    @HostBinding('class.layout-fs') get useFullLayout() {
        return this.settings.getLayoutSetting('useFullLayout');
    }

    @HostBinding('class.hidden-footer') get hiddenFooter() {
        return this.settings.getLayoutSetting('hiddenFooter');
    }

    @HostBinding('class.layout-h') get horizontal() {
        return this.settings.getLayoutSetting('horizontal');
    }

    @HostBinding('class.aside-float') get isFloat() {
        return this.settings.getLayoutSetting('isFloat');
    }

    @HostBinding('class.offsidebar-open') get offsidebarOpen() {
        return this.settings.getLayoutSetting('offsidebarOpen');
    }

    @HostBinding('class.aside-toggled') get asideToggled() {
        return this.settings.getLayoutSetting('asideToggled');
    }

    @HostBinding('class.aside-collapsed-text') get isCollapsedText() {
        return this.settings.getLayoutSetting('isCollapsedText');
    }

    toasterConfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right'
    });

    constructor(public settings: SettingsService,
                private translateService: TranslateService) {


    }

    ngOnInit() {
        this.installLanguage();
        // prevent empty links to reload the page
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' && ['', '#'].indexOf(target.getAttribute('href')) > -1) {
                e.preventDefault();
            }
        });
    }

    private installLanguage() {
        this.translateService.setDefaultLang(environment.defaultLocale);
        const saveLocales = Cookie.get('locale');
        if (saveLocales) {
            this.translateService.use(saveLocales);
        } else {
            this.translateService.use(environment.defaultLocale);
            Cookie.set('locale', environment.defaultLocale, 1000, '/');
        }
    }
}
