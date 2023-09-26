import { AbstractEndpoints, IUserEndpoints } from './endpoints.abstract';
import { ServiceConfig } from 'src/app/services/config/config.service';

export class EndpointsMock implements AbstractEndpoints {

    constructor(private config: ServiceConfig) { }

    user: IUserEndpoints = {
        getUserByUserId: (userId: string) => `${this.config.apiBaseURL}/Users/${userId}`,
        saveUser: `${this.config.apiBaseURL}/Users`
    };
}
