import { AbstractEndpoints, IUserEndpoints } from './endpoints.abstract';
import { ServiceConfig } from 'src/app/services/config/config.service';

export class Endpoints implements AbstractEndpoints {

    constructor(private config: ServiceConfig) { }

    user: IUserEndpoints = {
        getUserByUserId: (userId: string) => `${this.config.apiBaseURL}/api/user/${userId}`,
        saveUser: `${this.config.apiBaseURL}/api/Users/`
    };
}
