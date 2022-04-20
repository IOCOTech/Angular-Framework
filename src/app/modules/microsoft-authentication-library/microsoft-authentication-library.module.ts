import { Location } from "@angular/common";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalInterceptor, MsalModule, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { ServiceConfig } from 'src/app/services/config.service/config.service';
import { MSALGuardConfigFactory, MSALInstanceFactory, MSALInterceptorConfigFactory } from 'src/environments/msal/msal.config';
import { FactoryRouteGuard } from './route-guard/route-guard.factory';
import { AbstractRouteGuard } from './route-guard/route-mock.guard.abstract';
@NgModule({
  declarations: [],
  imports: [
    MsalModule
  ]
})
export class MicrosoftAuthenticationLibraryModule {

  static forRoot(): ModuleWithProviders<MicrosoftAuthenticationLibraryModule> {
    return {
      ngModule: MicrosoftAuthenticationLibraryModule,
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true },
        { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory, deps: [ServiceConfig] },
        { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory },
        { provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory },
        { provide: AbstractRouteGuard, useFactory: FactoryRouteGuard, deps: [MSAL_GUARD_CONFIG, MsalBroadcastService, MsalService, Location, Router]  },
        MsalService,
        MsalBroadcastService,
      ]
    };
  }
}
