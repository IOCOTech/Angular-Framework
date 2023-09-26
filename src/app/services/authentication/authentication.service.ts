import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType } from '@azure/msal-browser';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ModelAccountFromToken } from 'src/app/models/authorization/account-from-token.model';
import { ServiceMonitoring } from '../monitor/monitor.service';
import { AbstractServiceAuthentication } from './authentication.service.abstract';

export class ServiceAuthentication implements AbstractServiceAuthentication {

    public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private _account: ModelAccountFromToken | undefined = undefined;
    public get account(): ModelAccountFromToken | undefined {
        if (!this._account && !!this.serviceAuth.instance.getAllAccounts()[0]) {
            this._account = this.serviceAuth.instance.getAllAccounts()[0] as ModelAccountFromToken;
            // const orgString = this._account.idTokenClaims.extension_OrganizationId as string
            // if (orgString) {
            //     this._account.idTokenClaims.organizations = JSON.parse(orgString);
            //     this._account.idTokenClaims.selectedOrganization = this._account.idTokenClaims.organizations.find(o => o.isDefault) ?? this._account.idTokenClaims.organizations[0];
            // }
        }
        return this._account;
    }

    constructor(
        private serviceAuth: MsalService, private broadcastService: MsalBroadcastService,
        private serviceMonitor: ServiceMonitoring
    ) {
        this.updateLoginStatus()
    }

    // Call this event from the AppComponent OnInit
    registerForAuthenticationEvents(): void {
        this.broadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
            )
            .subscribe((result) => {
                this.updateLoginStatus();
                this.serviceMonitor.logEvent(this, 'Successfully logged in', { responsePayload: result });
            });


        this.broadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.SSO_SILENT_SUCCESS),
            )
            .subscribe((result) => {
                this.updateLoginStatus();
                this.serviceMonitor.logEvent(this, 'Successfully logged in using SSO', { responsePayload: result });
            });

        this.broadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE),
            )
            .subscribe((result) => {
                this.serviceMonitor.logException(this, 'Acquire Token Failure', { responsePayload: result });
            });

        this.broadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
            )
            .subscribe((result) => {
                this.serviceMonitor.logEvent(this, 'Acquire Token Success', { responsePayload: result });
            });
    }

    private updateLoginStatus(): void {
        this.serviceMonitor.logEvent(this, 'Updating login status', { value: !!this.account });
        if (this.account) {
            this.serviceMonitor.userId = this.account.localAccountId;
            this.isLoggedIn.next(true);
        }
    }

    setRegisterAuthority(): void {
        this.serviceMonitor.logEvent(this, 'MSAL set registration authority');
    }

    setLoginAuthority(): void {
        this.serviceMonitor.logEvent(this, 'MSAL set login authority');
    }

    logout(): void {
        this.serviceMonitor.logEvent(this, 'MSAL logout');
        this.serviceAuth.logout();
    }
}
