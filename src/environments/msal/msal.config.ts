import { Configuration } from 'msal';
import { MsalAngularConfiguration } from '@azure/msal-angular';
import { AppSettings } from '../app-settings/app-settings';
import { ServiceConfig } from 'src/app/services/config.service/config.service';

export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const protectedResourceMap: [string, string[]][] = [
    ['https://graph.microsoft.com/v1.0/me', ['user.read']],
    ['https://localhost:44386', ['https://{{app-name}}.onmicrosoft.com/{{app-name}}-api/user_impersonation']]
];

export function MSALConfigFactory(serviceConfig: ServiceConfig): Configuration {
    return {
        auth: {
            clientId: serviceConfig.authentication.clientId,
            authority: serviceConfig.authentication.authority,
            validateAuthority: serviceConfig.authentication.validateAuthority,
            redirectUri: serviceConfig.authentication.redirectUri,
            postLogoutRedirectUri: serviceConfig.authentication.postLogoutRedirectUri,
            navigateToLoginRequestUrl: serviceConfig.authentication.navigateToLoginRequestUrl
        },
        cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: isIE, // set to true for IE 11
        }
    };
}

export function MSALAngularConfigFactory(): MsalAngularConfiguration {
    return {
        popUp: false,
        consentScopes: [
            'openid',
            'profile',
            'https://{{app-name}}.onmicrosoft.com/{{app-name}}-api/user_impersonation'
        ],
        unprotectedResources: [AppSettings.configFileLocation],
        protectedResourceMap,
        extraQueryParameters: {}
    };
}
