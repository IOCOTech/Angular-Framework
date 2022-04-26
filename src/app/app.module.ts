import { LayoutModule } from '@angular/cdk/layout';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { FactoryEndpoints } from 'src/environments/endpoints/endpoints.factory';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { OidRedirectComponent } from './components/oid-redirect/oid-redirect.component';
import { ConfirmationDialogComponent } from './dialog-boxes/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './dialog-boxes/error-dialog/error-dialog.component';
import { InterceptorError } from './interceptors/error.interceptor';
import { InterceptorLoadingScreen } from './interceptors/loading.interceptor';
import { MaterialDesignModule } from './modules/material-design/material-design.module';
import {
  MicrosoftAuthenticationLibraryModule
} from './modules/microsoft-authentication-library/microsoft-authentication-library.module';
import { AbstractServiceAuthentication } from './services/authentication.service/authentication.service.abstract';
import { FactoryServiceAuthentication } from './services/authentication.service/authentication.service.factory';
import { ServiceConfig } from './services/config.service/config.service';
import { FactoryServiceConfig } from './services/config.service/config.service.factory';
import { ServiceMonitoring } from './services/monitor.service/monitor.service';
import { ConsoleErrorHandler } from '../app/helpers/console-error.helper';


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
    { provide: AbstractEndpoints, useFactory: FactoryEndpoints, deps: [ServiceConfig, ServiceMonitoring] },
    {
      provide: AbstractServiceAuthentication,
      useFactory: FactoryServiceAuthentication,
      deps: [HttpClient, ServiceMonitoring, MsalService, MsalBroadcastService, AbstractEndpoints, Router]
    },
    { provide: ErrorHandler, useClass: ConsoleErrorHandler }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
