import { Injectable } from '@angular/core';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { Logger, CryptoUtils } from 'msal';
import { BehaviorSubject } from 'rxjs';
import { AbstractServiceAuthentication } from './authentication.service.abstract';
import { ModelAccountFromToken } from 'src/app/models/Authorization/account-from-token.model';
import { ServiceMonitoring } from '../monitor.service/monitor.service';

@Injectable({
    providedIn: 'root',
})
export class ServiceAuthentication implements AbstractServiceAuthentication {

    public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    // The token model is defined in the B2C custom policies
    public get account(): ModelAccountFromToken { return this.serviceAuth.getAccount() as any as ModelAccountFromToken; }

    constructor(
        private serviceAuth: MsalService, private broadcastService: BroadcastService,
        private endpoints: AbstractEndpoints, private serviceMonitor: ServiceMonitoring
    ) {
        this.initializeAuthentication();
        this.updateLoginStatus();
    }

    initializeAuthentication(): void {
        this.broadcastService.subscribe('msal:loginSuccess', payload => {
            this.updateLoginStatus();
            this.serviceMonitor.logEvent(this, 'Successfully logged in');
        });

        this.broadcastService.subscribe('msal:acquireTokenFailure', (payload) => {
            this.serviceMonitor.logException(this, 'Acquire Token Failure', { responsePayload: payload });
        });

        this.broadcastService.subscribe('msal:acquireTokenSuccess', (payload) => {
            this.serviceMonitor.logEvent(this, 'Acquire Token Success', { responsePayload: payload });
        });

        this.serviceAuth.handleRedirectCallback((authError: any, response: any) => {
            if (authError) {
                this.serviceMonitor.logException(
                    this, 'Redirect error after callback', { responseAuthError: authError, responseBody: response }
                );
                return;
            }
        });

        this.serviceAuth.setLogger(new Logger(
            (logLevel, message, piiEnabled) => {
                this.serviceMonitor.logEvent(
                    this, message, { LogLevel: logLevel, PiiEnabled: piiEnabled }
                );
            },
            { correlationId: CryptoUtils.createNewGuid(), piiLoggingEnabled: false }
        ));
    }

    private updateLoginStatus(): void {
        this.serviceMonitor.logEvent(this, 'Updating login status', { value: !!this.serviceAuth.getAccount() });
        if (this.serviceAuth.getAccount()) {
            this.serviceMonitor.userId = this.account.accountIdentifier;
        }
        this.isLoggedIn.next(!!this.serviceAuth.getAccount());
    }

    setRegisterAuthority(): void {
        this.serviceMonitor.logEvent(this, 'MSAL set registration authority');
        this.serviceAuth.authority = this.endpoints.authorization.signup;
    }

    setLoginAuthority(): void {
        this.serviceMonitor.logEvent(this, 'MSAL set login authority');
        this.serviceAuth.authority = this.endpoints.authorization.login;
    }

    logout(): void {
        this.serviceMonitor.logEvent(this, 'MSAL logout');
        this.serviceAuth.logout();
    }
}
