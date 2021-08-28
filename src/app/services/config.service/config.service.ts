import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IConfig,
  IAuthenticationConfig,
  InitializeConfig,
  ILogging,
} from 'src/environments/config/config.interface';
import { AppSettings } from 'src/environments/app-settings/app-settings';
import { Enums } from 'src/app/enums/enums';

@Injectable({
  providedIn: 'root',
})
export class ServiceConfig implements IConfig {
  private readonly http: HttpClient;

  apiBaseURL!: string;
  appInsightsKey!: string;
  authentication!: IAuthenticationConfig;
  redirectUrl!: string;
  logging!: ILogging;

  /*
    Note ServiceConfig, constructor, in this we are not injecting HttpClient,
    because if you inject HttpClient then angular first resolve all the HTTP_INTERCEPTORS,
    and when you use MsalInterceptor in app module, this makes angular to load MsalService
    and other component used by MsalInterceptor load before APP_INITIALIZER.
    To resolve this issue we need to by pass HTTP_INTERCEPTORS, so for this we can use
    HttpBackend handler, and then create local instance of HttpClient in config service constructor.
    This will bypass the HTTP_INTERCEPTORS, while getting config file.
    */
  constructor(private readonly httpHandler: HttpBackend) {
    this.http = new HttpClient(httpHandler);
    Object.assign(this, InitializeConfig());
  }
  // This method must return a promise for the APP_INITIALIZER to work correctly
  loadConfig(): Promise<void> {
    return this.http
      .get<IConfig>(AppSettings.configFileLocation)
      .toPromise()
      .then((config: IConfig) => {
        this.apiBaseURL = config.apiBaseURL;
        this.appInsightsKey = config.appInsightsKey;
        this.authentication = config.authentication;
        switch (config.logging.loggingLevel) {
          case 'info':
            this.logging.loggingLevel = Enums.ErrorSeverityLevel.Info;
            break;
          case 'warning':
            this.logging.loggingLevel = Enums.ErrorSeverityLevel.Warning;
            break;
          case 'error':
            this.logging.loggingLevel = Enums.ErrorSeverityLevel.Error;
            break;
          default:
            console.warn(
              "Logging level not set in config.  Level set to 'Info' by default"
            );
            this.logging.loggingLevel = Enums.ErrorSeverityLevel.Info;
            break;
        }
        this.logging.errorLogTo = config.logging.errorLogTo;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
