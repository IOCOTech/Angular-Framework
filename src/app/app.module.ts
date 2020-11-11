import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { AbstractServiceAuthentication } from './services/authentication.service/authentication.service.abstract';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfirmationDialogComponent } from './dialog-boxes/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './dialog-boxes/error-dialog/error-dialog.component';
import { FactoryEndpoints } from 'src/environments/endpoints/endpoints.factory';
import { FactoryServiceAuthentication } from './services/authentication.service/authentication.service.factory';
import { FactoryServiceConfig } from './services/config.service/config.service.factory';
import { InterceptorLoadingScreen } from './interceptors/loading.interceptor';
import { InterceptorError } from './interceptors/error.interceptor';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { HomeComponent } from './components/home/home.component';
import { MaterialDesignModule } from './modules/material-design/material-design.module';
import {
    MicrosoftAuthenticationLibraryModule
} from './modules/microsoft-authentication-library/microsoft-authentication-library.module';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { OidRedirectComponent } from './components/oid-redirect/oid-redirect.component';
import { ServiceConfig } from './services/config.service/config.service';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ServiceMonitoring } from './services/monitor.service/monitor.service';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    HomeComponent,
    LoadingScreenComponent,
    OidRedirectComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MaterialDesignModule.forRoot(),
    MicrosoftAuthenticationLibraryModule.forRoot()
  ],
  providers: [
    // APP INITIALIZER
    { provide: APP_INITIALIZER, useFactory: FactoryServiceConfig, deps: [ServiceConfig, Router], multi: true },
    // HTTP INTERCEPTORS
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorLoadingScreen, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorError, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: AbstractEndpoints, useFactory: FactoryEndpoints, deps: [ServiceConfig, ServiceMonitoring] },
    {
      provide: AbstractServiceAuthentication,
      useFactory: FactoryServiceAuthentication,
      deps: [HttpClient, ServiceMonitoring, MsalService, BroadcastService, AbstractEndpoints, Router]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
