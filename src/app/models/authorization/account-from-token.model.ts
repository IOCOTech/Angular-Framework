export interface ModelAccountFromToken {
    accountIdentifier: string;
    homeAccountIdentifier: string;
    name: string;
    idToken: ModelIdToken;
    idTokenClaims: ModelIdTokenClaims;
    environment: string;
}

export interface ModelIdToken {
    exp: number;
    nbf: number;
    ver: string;
    iss: string;
    sub: string;
    aud: string;
    acr: string;
    nonce: string;
    iat: number;
    auth_time: number;
    roles: string[];
    email: string;
    newUser: boolean;
    name: string;
    surname: string;
}

export interface ModelIdTokenClaims {
    exp: number;
    nbf: number;
    ver: string;
    iss: string;
    sub: string;
    aud: string;
    acr: string;
    nonce: string;
    iat: number;
    auth_time: number;
    roles: string[];
    email: string;
    newUser: boolean;
    name: string;
    surname: string;
}

