import { AbstractServiceAuthentication } from './authentication.service.abstract';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ModelAccountFromToken } from 'src/app/models/Authorization/account-from-token.model';
import { HttpClient } from '@angular/common/http';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';

export class MockServiceAuthentication implements AbstractServiceAuthentication {

    public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private storageForAccountName = 'mock_data_account';

    constructor(private httpClient: HttpClient, private endpoints: AbstractEndpoints, private router: Router) {
        this.initializeAuthentication();
    }

    get account(): ModelAccountFromToken | null {
        const token = localStorage.getItem(this.storageForAccountName);
        return !!token ? (JSON.parse(token) as ModelAccountFromToken) : null;
    }

    initializeAuthentication(): void {
        this.setLoginAuthority();
    }

    setRegisterAuthority(): void {
        this.httpClient.get<ModelAccountFromToken[]>(`${this.endpoints.authorization.signup}?mockId=new`).subscribe(user => {
            localStorage.setItem(this.storageForAccountName, JSON.stringify(user[0]));
            this.router.Navigation.NavigateTo.Home();
        });

    }

    setLoginAuthority(): void {
        this.httpClient.get<ModelAccountFromToken[]>(`${this.endpoints.authorization.login}?mockId=existing`).subscribe(user => {
            localStorage.setItem(this.storageForAccountName, JSON.stringify(user[0]));
            this.router.Navigation.NavigateTo.Home();
        });
    }

    logout(): void {
        this.isLoggedIn.next(false);
        this.router.Navigation.NavigateTo.Home();
    }
}
