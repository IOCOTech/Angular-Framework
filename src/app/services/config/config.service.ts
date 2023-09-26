import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IConfig } from 'src/environments/config/config.interface';
import { AppSettings } from 'src/environments/app-settings/app-settings';
import { Enums } from 'src/app/enums/enums';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceConfig extends IConfig {
  private readonly http: HttpClient;

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
    super();
    this.http = new HttpClient(httpHandler);
  }
  // This method must return a promise for the APP_INITIALIZER to work correctly
  loadConfig(): Promise<void> {
    const observable = this.http.get<IConfig>(AppSettings.configFileLocation)
    var promise = firstValueFrom(observable);
    return promise
      .then((config: IConfig) => {
        Object.assign(this, config);
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
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
