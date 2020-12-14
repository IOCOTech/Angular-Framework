import { HttpClient } from '@angular/common/http';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { ServiceAuthentication } from './authentication.service';
import { MsalService, BroadcastService } from '@azure/msal-angular';
import { MockServiceAuthentication } from './authentication.service.mock';
import { Router } from '@angular/router';
import { AppSettings } from 'src/environments/app-settings/app-settings';
import { ServiceMonitoring } from '../monitor.service/monitor.service';
import { Enums } from 'src/app/enums/enums';
import { AbstractServiceAuthentication } from './authentication.service.abstract';

export function FactoryServiceAuthentication(
    httpClient: HttpClient, serviceMonitor: ServiceMonitoring,
    serviceMsal: MsalService, serviceBroadcast: BroadcastService, endpoints: AbstractEndpoints, router: Router
): AbstractServiceAuthentication {
    serviceMonitor.logEvent('FactoryServiceAuthentication', 'Authentication Service Factory loaded');
    switch (AppSettings.environment) {
        case Enums.Environments.MockData:
            return new MockServiceAuthentication(httpClient, endpoints, router);
        default:
            return new ServiceAuthentication(serviceMsal, serviceBroadcast, endpoints, serviceMonitor);
    }
}
