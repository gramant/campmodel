import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {User, UserId} from '../../../domain/User';
import {Columns, Config, DefaultConfig} from 'ngx-easy-table';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../auth/auth.service';
import {AdminApiService} from './admin-api.service';
import {RequestStatuses} from '../../../components/RequestStatuses';
import {InviteAdministratorRequest} from '../../../domain/request/InviteAdministratorRequest';
import {InviteUserAdministratorModalComponent} from '../invite-administrator-user-modal/invite-user-administrator-modal.component';

@Component({
    selector: 'app-administrator-users-board',
    templateUrl: './administrator-users-board.component.html',
    styleUrls: ['./administrator-users-board.component.scss']
})
export class AdministratorUsersBoardComponent implements OnInit {
    public configuration: Config;

    @ViewChild('countryColumn', {static: true}) countryColumn: TemplateRef<any>;
    @ViewChild('dateColumn', {static: true}) dateColumn: TemplateRef<any>;
    @ViewChild('roleColumn', {static: true}) roleColumn: TemplateRef<any>;
    @ViewChild('deleteColumn', {static: true}) deleteColumn: TemplateRef<any>;

    public columns: Columns[];

    currentUser$: Observable<User>;

    users: User[];

    inviteAdministratorRequestStat = RequestStatuses.new();
    getAdminUsersRequestStat = RequestStatuses.new();

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private modalService: BsModalService,
                private authService: AuthService,
                private adminApiService: AdminApiService
    ) {
    }

    ngOnInit(): void {
        this.currentUser$ = this.authService.getCurrentUser();

        this.refreshUsers();

        this.columns = [
            {key: 'name', title: 'Name'},
            {key: 'email', title: 'Email'},
            {key: 'joinedOn', title: 'Joined', cellTemplate: this.dateColumn},
            {key: 'roles', title: 'Roles', cellTemplate: this.roleColumn},
            {key: 'delete', title: '', cellTemplate: this.deleteColumn, width: '5%'},
        ];

        this.configuration = {...DefaultConfig};
    }

    private refreshUsers() {
        this.getAdminUsersRequestStat.addCheckStat(this.adminApiService.getAdminUsers())
            .subscribe(value => {
                this.users = (value as User[]).map(val => User.parse(val));
            });
    }

    openInviteSupportModal() {
        const modalRef = this.modalService.show(
            InviteUserAdministratorModalComponent,
            {
                initialState: {
                    inviteAdministratorRequestStat: this.inviteAdministratorRequestStat,
                    submit: (inviteSupport: InviteAdministratorRequest) => {
                        return this.doAddAdministration(inviteSupport, modalRef);
                    },
                },
                backdrop: 'static'
            }
        );
    }

    doAddAdministration(inviteSupport: InviteAdministratorRequest, modalRef: BsModalRef) {
        this.inviteAdministratorRequestStat.addCheckStat(this.adminApiService.inviteSupport(inviteSupport))
            .subscribe(value => {
                modalRef.hide();
                this.refreshUsers();
            });

    }

    removeFromGroup(userId: UserId) {

    }

    // showDeleteButton(profileRef: ProfileRef, profile: Profile): boolean {
    // const commonDocumentSection = {
    //     code: 'common',
    //     name: 'COMMON',
    //     role: Role.PARTICIPANT,
    // };
    //
    // const roleCurrent = this.gerRoleFromSection(profile.documentSections, this.section);
    //
    // const roleSelect = this.gerRoleFromSection(profileRef.documentSections, this.section);
    //
    // const roleCurrentCommon = this.gerRoleFromSection(profile.documentSections, commonDocumentSection);
    //
    // const countryEquals = profileRef.country === profile.country;
    //
    // if ((
    //         (roleSelect === Role.PARTICIPANT && roleCurrent === Role.CHAIR)
    //         || (roleSelect === Role.PARTICIPANT && roleCurrent === Role.CHAIR)
    //         || roleCurrentCommon === Role.CHAIR
    //     )
    //     && countryEquals
    //     && profileRef.email !== profile.email) {
    //     return true;
    // }
    //
    // return false;
    // }


    // gerRoleFromSection(documentSections: DocumentSection[], documentSectionSearch: DocumentSection) {
    // const documentSection = documentSections.find(value => {
    //     return value.code === documentSectionSearch.code;
    // });
    //
    // if (documentSection) {
    //     return documentSection.role;
    // }
    //
    // return null;
    // }

    getViewRoles(user: User): string {
        if (user) {
            return user.roles.join(', ');
        }
        return '';
    }


}
