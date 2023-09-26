import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ModelAccountFromToken } from 'src/app/models/authorization/account-from-token.model';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { AbstractServiceAuthentication } from './authentication.service.abstract';

export class MockServiceAuthentication implements AbstractServiceAuthentication {

    public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private storageForAccountName = 'mock_data_account';

    constructor(private httpClient: HttpClient, private endpoints: AbstractEndpoints) {
        this.registerForAuthenticationEvents();
    }

    get account(): ModelAccountFromToken | undefined {
        const token = localStorage.getItem(this.storageForAccountName);
        return !!token ? (JSON.parse(token) as ModelAccountFromToken) : undefined;
    }

    registerForAuthenticationEvents(): void {
        this.setLoginAuthority();
    }

    setRegisterAuthority(): void {
        this.httpClient.get<ModelAccountFromToken[]>(`${this.endpoints.authorization.signup}?mockId=new`).subscribe(user => {
            localStorage.setItem(this.storageForAccountName, JSON.stringify(user[0]));
        });

    }

    setLoginAuthority(): void {
        this.httpClient.get<ModelAccountFromToken[]>(`${this.endpoints.authorization.login}?mockId=existing`).subscribe(user => {
            localStorage.setItem(this.storageForAccountName, JSON.stringify(user[0]));
        });
    }

    logout(): void {
        this.isLoggedIn.next(false);
    }
}
