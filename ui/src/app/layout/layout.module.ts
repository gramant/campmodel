import {NgModule} from '@angular/core';

import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {UserblockComponent} from './sidebar/userblock/userblock.component';
import {UserblockService} from './sidebar/userblock/userblock.service';
import {FooterComponent} from './footer/footer.component';

import {SharedModule} from '../shared/shared.module';
import {CoreModule} from '../core/core.module';
import {TranslateModule} from '@ngx-translate/core';
import {SinglePageLayoutComponent} from './single-page-layout/single-page-layout.component';

@NgModule({
    imports: [
        SharedModule,
        CoreModule,
        TranslateModule,
    ],
    providers: [
        UserblockService
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        UserblockComponent,
        HeaderComponent,
        FooterComponent,
        SinglePageLayoutComponent
    ],
    exports: [
        LayoutComponent,
        SidebarComponent,
        UserblockComponent,
        HeaderComponent,
        FooterComponent
    ]
})
export class LayoutModule {
}
