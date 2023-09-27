import { BehaviorSubject } from 'rxjs';
import { ModelAccountFromToken } from 'src/app/models/authorization/account-from-token.model';

/*
This abstract class is used to wrap the authentication service so it can be mocked.
The commented private properties must be added to the file that implements the AbstractServiceAuthentication
*/
export abstract class AbstractServiceAuthentication {

    /**
    * Returns a boolean indicating if the user is logged in.
    * @returns {boolean}
    * @remarks
    * REMEMBER TO UNSUBSCRIBE IF YOU SUBSCRIBE TO THIS PROPERTY
    * IF YOU DON'T NEED TO SUBSCRIBE JUST USE isLoggedIn.getValue()
    */
    abstract isLoggedIn: BehaviorSubject<boolean>;
    abstract get account(): ModelAccountFromToken | undefined;
    abstract registerForAuthenticationEvents(): void;

    /*
    private updateLoginStatus(): void {
        this.loggedIn.next(!!this.authService.getAccount());
    }
    */

    abstract setRegisterAuthority(): void;

    abstract setLoginAuthority(): void;

    abstract logout(): void;
}
