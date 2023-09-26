import { AccountInfo } from '@azure/msal-browser';
import { TokenClaims } from '@azure/msal-common';
import { ModelIdTokenExtendedClaims } from './id-token-extended-claims.model';

export interface ModelAccountFromToken extends AccountInfo {
    idTokenClaims: TokenClaims & ModelIdTokenExtendedClaims & {
        [key: string]: string | number | string[] | object | undefined | unknown;
    };
    
}


