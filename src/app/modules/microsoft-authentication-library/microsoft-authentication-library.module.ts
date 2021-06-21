import { ModuleWithProviders, NgModule } from '@angular/core';
import { MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { PublicClientApplication } from '@azure/msal-browser/dist/app/PublicClientApplication';
import { BrowserCacheLocation, InteractionType } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    MsalModule.forRoot(new PublicClientApplication({ // MSAL Configuration
      auth: {
        clientId: '4756cca9-9d36-4e3a-a88a-ff1a8624a95b',
        authority: 'https://aautologin.b2clogin.com/fc214cde-4549-4870-822f-4ecfdcf8b211/B2C_1_Signup_Signin/',
        navigateToLoginRequestUrl: true,
        knownAuthorities: ['https://aautologin.b2clogin.com'],
        redirectUri: 'http://localhost:4200/oid-redirect'
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
    }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
    }, {
      interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    })
  ]
})
export class MicrosoftAuthenticationLibraryModule {


  static forRoot(): ModuleWithProviders<MicrosoftAuthenticationLibraryModule> {
    return {
      ngModule: MicrosoftAuthenticationLibraryModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: MsalInterceptor,
          multi: true
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService
      ]
    };
  }
  // static forRoot(): any {
  //   return {
  //     NgModule: MicrosoftAuthenticationLibraryModule,

  //    };
  // }
}
