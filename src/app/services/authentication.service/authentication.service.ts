import { Injectable, OnDestroy } from '@angular/core';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { BehaviorSubject, Subject } from 'rxjs';
import { AbstractServiceAuthentication } from './authentication.service.abstract';
import { ModelAccountFromToken } from 'src/app/models/authorization/account-from-token.model';
import { ServiceMonitoring } from '../monitor.service/monitor.service';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { filter, takeUntil } from 'rxjs/operators';
import { EventMessage, EventType } from '@azure/msal-browser';

@Injectable({
    providedIn: 'root',
})
export class ServiceAuthentication implements AbstractServiceAuthentication, OnDestroy {


    public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // The token model is defined in the B2C custom policies
    public get account(): ModelAccountFromToken { return this.serviceAuth.instance.getActiveAccount() as any as ModelAccountFromToken; }

    private readonly _destroying$ = new Subject<void>();

    constructor(
        private serviceAuth: MsalService, private broadcastService: MsalBroadcastService,
        private endpoints: AbstractEndpoints, private serviceMonitor: ServiceMonitoring
    ) {
        this.initializeAuthentication();
        this.updateLoginStatus();
    }
    ngOnDestroy(): void {
        this._destroying$.next(undefined);
        this._destroying$.complete();
    }

    initializeAuthentication(): void {
        this.broadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
                takeUntil(this._destroying$)
            )
            .subscribe((result) => {
                this.updateLoginStatus();
                this.serviceMonitor.logEvent(this, 'Successfully logged in', { responsePayload: result });
            });

        this.broadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_FAILURE),
                takeUntil(this._destroying$)
            )
            .subscribe((result) => {
                this.serviceMonitor.logException(this, 'Acquire Token Failure', { responsePayload: result });
            });

        this.broadcastService.msalSubject$
            .pipe(
                filter((msg: EventMessage) => msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS),
                takeUntil(this._destroying$)
            )
            .subscribe((result) => {
                this.serviceMonitor.logEvent(this, 'Acquire Token Success', { responsePayload: result });
            });

        // TODO: test if this is required
        // this.broadcastService.msalSubject$
        // .pipe(
        //     filter((msg: EventMessage) => msg.eventType === EventType.HANDLE_REDIRECT_START),
        //     takeUntil(this._destroying$)
        // )
        // .subscribe((result) => {
        //     if (authError) {
        //         this.serviceMonitor.logException(
        //             this, 'Redirect error after callback', { responseAuthError: authError, responseBody: response }
        //         );
        //         return;
        //     }
        // });
    }

    private updateLoginStatus(): void {
        this.serviceMonitor.logEvent(this, 'Updating login status', { value: !!this.serviceAuth.instance.getActiveAccount() });
        if (this.serviceAuth.instance.getActiveAccount()) {
            this.serviceMonitor.userId = this.account.accountIdentifier;
        }
        this.isLoggedIn.next(!!this.serviceAuth.instance.getActiveAccount());
    }

    setRegisterAuthority(): void {
        this.serviceMonitor.logEvent(this, 'MSAL set registration authority');
        // this.serviceAuth. = this.endpoints.authorization.signup;
    }

    setLoginAuthority(): void {
        this.serviceMonitor.logEvent(this, 'MSAL set login authority');
        // this.serviceAuth.authority = this.endpoints.authorization.login;
    }

    logout(): void {
        this.serviceMonitor.logEvent(this, 'MSAL logout');
        this.serviceAuth.logout();
    }
}
