import { AbstractEndpoints, IAuthorizationEndpoints, IUserEndpoints } from './endpoints.abstract';
import { ServiceConfig } from 'src/app/services/config.service/config.service';

export class Endpoints implements AbstractEndpoints {

    constructor(private config: ServiceConfig) { }

    authorization: IAuthorizationEndpoints = {
        login: 'https://{tenant-name}.b2clogin.com/{tenantId}/B2C_1A_signin',
        passwordReset: 'https://{tenant-name}.b2clogin.com/{tenantId}/B2C_1A_password_reset',
        profileEdit: 'https://{tenant-name}.b2clogin.com/{tenantId}/B2C_1A_profile_edit',
        signup: 'https://{tenant-name}.b2clogin.com/{tenantId}/B2C_1A_signup',
        loginRedirect: 'http://localhost:4200/',
        registerRedirect: 'http://localhost:4200/new-user-wizard'
    };

    user: IUserEndpoints = {
        getUserByUserId: (userId: string) => `${this.config.apiBaseURL}/api/user/${userId}`,
        saveUser: `${this.config.apiBaseURL}/api/Users/`
    };
}
