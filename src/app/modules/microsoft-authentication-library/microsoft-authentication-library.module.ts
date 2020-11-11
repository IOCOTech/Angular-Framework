import { NgModule, ErrorHandler } from '@angular/core';
import { ServiceConfig } from 'src/app/services/config.service/config.service';
import { MSALConfigFactory, MSALAngularConfigFactory } from 'src/environments/msal/msal.config';
import { MsalService, MSAL_CONFIG_ANGULAR, MSAL_CONFIG, MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    MsalModule
  ]
})
export class MicrosoftAuthenticationLibraryModule {
  static forRoot() {
    return {
        ngModule: MicrosoftAuthenticationLibraryModule,
      providers: [
        { provide: MSAL_CONFIG, useFactory: MSALConfigFactory, deps: [ServiceConfig] },
        { provide: MSAL_CONFIG_ANGULAR, useFactory: MSALAngularConfigFactory, deps: [ServiceConfig] },
        MsalService,
        { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
      ]
    };
  }
}
