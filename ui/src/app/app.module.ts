import {AppComponent} from './app.component';

import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {SharedModule} from './shared/shared.module';
import {RoutesModule} from './routes/routes.module';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClipboardModule} from 'ngx-clipboard';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {NgSelectModule} from '@ng-select/ng-select';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {CookieService} from 'ngx-cookie-service';
import {InterceptorCatchUserNotLogin} from './Interceptors/Interceptor-catch-user-not-login';
import {PagesModule} from './pages/pages.module';
import {MainModule} from './main/main.module';
import {NgxCurrencyModule} from 'ngx-currency';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslatePoHttpLoader} from '@biesbjerg/ngx-translate-po-http-loader';
import {InterceptorAddLocaleToHeader} from './Interceptors/Interceptor-add-locale-to-header';
import {Ng5SliderModule} from 'ng5-slider';
import {InterceptorCatch502ErrorInterceptor} from './Interceptors/interceptor-catch502-error.interceptor';
import {InterceptorCatch504ErrorInterceptor} from './Interceptors/interceptor-catch504-error.interceptor';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localeRu);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        HttpClientModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        LayoutModule,
        ClipboardModule,
        ToasterModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: function createTranslateLoader(http: HttpClient) {
                    return new TranslatePoHttpLoader(http, 'assets/i18n/', '.po');
                },
                deps: [HttpClient]
            }
        }),
        SharedModule.forRoot(),
        RoutesModule,
        ToasterModule.forRoot(),
        BsDropdownModule.forRoot(),
        PagesModule,
        MainModule,
        NgSelectModule,
        StoreDevtoolsModule.instrument({
            maxAge: 10
        }),
        NgxCurrencyModule,
        Ng5SliderModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'ru' },
        CookieService,
        ToasterService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorCatchUserNotLogin,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorCatch502ErrorInterceptor,
            multi: true
        },
        {

            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorCatch504ErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorAddLocaleToHeader,
            multi: true
        }
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
