import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialDesignModule } from './modules/material-design/material-design.module';
import { MicrosoftAuthenticationLibraryModule } from './modules/microsoft-authentication-library/microsoft-authentication-library.module';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { AbstractServiceAuthentication } from './services/authentication/authentication.service.abstract';
import { ConsoleErrorHandler } from '../app/helpers/console-error.helper';
import { FactoryEndpoints } from 'src/environments/endpoints/endpoints.factory';
import { FactoryServiceAuthentication } from './services/authentication/authentication.service.factory';
import { FactoryServiceConfig } from './services/config/config.service.factory';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorError } from './interceptors/error.interceptor';
import { InterceptorLoadingScreen } from './interceptors/loading.interceptor';
import { MsalBroadcastService, MsalRedirectComponent, MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { ServiceConfig } from './services/config/config.service';
import { ServiceMonitoring } from './services/monitor/monitor.service';
import { ConfirmationDialogComponent } from './dialog-boxes/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './dialog-boxes/error-dialog/error-dialog.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationSnackbarComponent } from './components/notification-snackbar/notification-snackbar.component';
import { OidRedirectComponent } from './components/oid-redirect/oid-redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    LoadingScreenComponent,
    NotFoundComponent,
    NotificationSnackbarComponent,
    OidRedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialDesignModule.forRoot(),
    MicrosoftAuthenticationLibraryModule.forRoot()
  ],
  providers: [
    // APP INITIALIZER'
           { provide: APP_INITIALIZER, useFactory: FactoryServiceConfig, deps: [ServiceConfig, Router], multi: true },
           // HTTP INTERCEPTORS
           { provide: HTTP_INTERCEPTORS, useClass: InterceptorLoadingScreen, multi: true },
           { provide: HTTP_INTERCEPTORS, useClass: InterceptorError, multi: true },
           { provide: AbstractEndpoints, useFactory: FactoryEndpoints, deps: [ServiceConfig, ServiceMonitoring] },
           {
              provide: AbstractServiceAuthentication,
              useFactory: FactoryServiceAuthentication,
              deps: [MsalService, MsalBroadcastService, AbstractEndpoints, ServiceMonitoring]
            },
            { provide: ErrorHandler, useClass: ConsoleErrorHandler }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
