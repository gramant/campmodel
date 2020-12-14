import {Component, Injector, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserblockService} from '../sidebar/userblock/userblock.service';
import {SettingsService} from '../../core/settings/settings.service';
import {Observable} from 'rxjs';
import {User} from '../../domain/User';
import {AuthService} from '../../auth/auth.service';
import {Role} from '../../domain/Role';
import {TranslateService} from '@ngx-translate/core';

const screenfull = require('screenfull');

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    Role = Role;
    navCollapsed = true; // for horizontal layout

    currentUser$: Observable<User>;

    router: Router;

    year: number;

    isNavSearchVisible: boolean;
    @ViewChild('fsbutton', {static: true}) fsbutton;  // the fullscreen button

    constructor(public userBlockService: UserblockService,
                public settings: SettingsService,
                public injector: Injector,
                private authService: AuthService,
                public translateService: TranslateService) {

    }

    ngOnInit() {
        this.isNavSearchVisible = false;

        const ua = window.navigator.userAgent;
        if (ua.indexOf('MSIE ') > 0 || !!ua.match(/Trident.*rv\:11\./)) { // Not supported under IE
            this.fsbutton.nativeElement.style.display = 'none';
        }

        // Switch fullscreen icon indicator
        // const el = this.fsbutton.nativeElement.firstElementChild;
        // screenfull.on('change', () => {
        //     if (el) {
        //         el.className = screenfull.isFullscreen ? 'fa fa-compress' : 'fa fa-expand';
        //     }
        // });

        this.router = this.injector.get(Router);

        // Autoclose navbar on mobile when route change
        this.router.events.subscribe((val) => {
            // scroll view to top
            window.scrollTo(0, 0);
            // close collapse menu
            this.navCollapsed = true;
        });

        this.currentUser$ = this.authService.getCurrentUser();
    }

    getHomePath(user: User) {
        if (User.isUserHasRole(Role.SUPPORT, user)) {
            return '/users';
        } else {
            return '/dashboard';
        }
    }

    toggleUserBlock(event) {
        event.preventDefault();
        this.userBlockService.toggleVisibility();
    }

    openNavSearch(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    }

    setNavSearchVisible(stat: boolean) {
        // console.log(stat);
        this.isNavSearchVisible = stat;
    }

    getNavSearchVisible() {
        return this.isNavSearchVisible;
    }

    toggleOffsidebar() {
        this.settings.toggleLayoutSetting('offsidebarOpen');
    }

    toggleCollapsedSideabar() {
        this.settings.toggleLayoutSetting('isCollapsed');
    }

    isCollapsedText() {
        return this.settings.getLayoutSetting('isCollapsedText');
    }

    toggleFullScreen(event) {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    }

    logout() {
        this.authService.logout().subscribe();
    }

    userHasRole(user: User, role: Role): boolean {
        if (user) {
            const roles = user.roles.filter(value => value === role);

            return roles.length !== 0;
        } else {
            return false;
        }
    }

}

