import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { NavigationRoutes } from 'src/app/helpers/navigation.routes.helper';
import { ServiceConfig } from 'src/app/services/config/config.service';

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
      knownAuthorities: ['{REPLACE-WITH-ORGANIZATION}'],
      redirectUri: serviceConfig.authentication.redirectUri,
      postLogoutRedirectUri: serviceConfig.authentication.postLogoutRedirectUri
    },
    cache: {
      cacheLocation: BrowserCacheLocation.SessionStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set("https://graph.microsoft.com/v1.0/me", ["user.read"]);
  // THE SCOPES BELOW NEEDS TO BE CREATED IN THE OAUTH PROVIDER
  // Get token for functions
  protectedResourceMap.set("https://azure-functions.azurewebsites.net", ["https://{REPLACE-WITH-ORGANIZATION}.onmicrosoft.com/00000000-0000-0000-0000-000000000000/token.read"]);
  // Get token for API
  protectedResourceMap.set("http://localhost:7082/", ["https://{REPLACE-WITH-ORGANIZATION}.onmicrosoft.com/00000000-0000-0000-0000-000000000000/organization.readwrite"]);

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

    loginFailedRoute: NavigationRoutes.LandingPage.path
  };
}
