export abstract class AbstractEndpoints {
    user!: IUserEndpoints;
}

export interface IUserEndpoints {
    getUserByUserId(userId: string): string;
    saveUser: string;
}
