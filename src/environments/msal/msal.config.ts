import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { ServiceConfig } from 'src/app/services/config.service/config.service';

export const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

// export const protectedResourceMap: [string, string[]][] = [
//     ['https://graph.microsoft.com/v1.0/me', ['user.read']]
// ];
// TODO: Update knownAuthorities to read from config
export function MSALInstanceFactory(serviceConfig: ServiceConfig): IPublicClientApplication {
    return new PublicClientApplication({
        auth: {
            clientId: serviceConfig.authentication.clientId,
            authority: serviceConfig.authentication.authority,
            navigateToLoginRequestUrl: serviceConfig.authentication.navigateToLoginRequestUrl,
            knownAuthorities: ['https://arenalogin.b2clogin.com', 'http://localhost:4200'],
            redirectUri: serviceConfig.authentication.redirectUri,
            postLogoutRedirectUri: serviceConfig.authentication.postLogoutRedirectUri
          },
          cache: {
            cacheLocation: BrowserCacheLocation.LocalStorage,
            storeAuthStateInCookie: true, // set to true for IE 11
          },
          system: {
            loggerOptions: {
              loggerCallback: () => { },
              piiLoggingEnabled: false
            }
          }
    });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
    const protectedResourceMap = new Map<string, Array<string>>();
    protectedResourceMap.set("https://graph.microsoft.com/v1.0/me", ["user.read"]);
  
    return {
      interactionType: InteractionType.Redirect,
      protectedResourceMap
    };
  }
  
  export function MSALGuardConfigFactory(): MsalGuardConfiguration {
    return { 
      interactionType: InteractionType.Redirect,
      authRequest: { 
        // scopes: ['user.read']
      },
      loginFailedRoute: "home"
    };
  }
