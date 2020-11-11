import { AbstractEndpoints, IAuthorizationEndpoints, IUserEndpoints } from './endpoints.abstract';
import { ServiceConfig } from 'src/app/services/config.service/config.service';

export class EndpointsMock implements AbstractEndpoints {

    constructor(private config: ServiceConfig) { }

    authorization: IAuthorizationEndpoints = {
        login: `${this.config.apiBaseURL}/accountsFromB2C`,
        passwordReset: 'NA',
        profileEdit: 'NA',
        signup: `${this.config.apiBaseURL}/accountsFromB2C`,
        loginRedirect: 'http://localhost:4200/',
        registerRedirect: 'http://localhost:4200/new-user-wizard'
    };

    user: IUserEndpoints = {
        getUserByUserId: (userId: string) => `${this.config.apiBaseURL}/Users/${userId}`,
        saveUser: `${this.config.apiBaseURL}/Users`
    };
}
