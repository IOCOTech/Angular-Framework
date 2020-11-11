export abstract class AbstractEndpoints {

    authorization!: IAuthorizationEndpoints;
    user!: IUserEndpoints;

    constructor() {
    }

}

export interface IAuthorizationEndpoints {
    login: string;
    passwordReset: string;
    profileEdit: string;
    signup: string;
    loginRedirect: string;
    registerRedirect: string;
}

export interface IUserEndpoints {
    saveUser: string;
    getUserByUserId(userId: string): string;
}