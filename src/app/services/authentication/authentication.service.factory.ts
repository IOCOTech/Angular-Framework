import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Enums } from 'src/app/enums/enums';
import { AppSettings } from 'src/environments/app-settings/app-settings';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { ServiceMonitoring } from '../monitor/monitor.service';
import { ServiceAuthentication } from './authentication.service';
import { AbstractServiceAuthentication } from './authentication.service.abstract';

export function FactoryServiceAuthentication(    
    serviceMsal: MsalService, serviceBroadcast: MsalBroadcastService, endpoints: AbstractEndpoints,
    serviceMonitor: ServiceMonitoring, 
): AbstractServiceAuthentication {
    serviceMonitor.logEvent('FactoryServiceAuthentication', 'Authentication Service Factory loaded');
    switch (AppSettings.environment) {
        case Enums.Environments.MockData:
            // return new MockServiceAuthentication(httpClient, endpoints);
            return new ServiceAuthentication(serviceMsal, serviceBroadcast, serviceMonitor);
        default:
            return new ServiceAuthentication(serviceMsal, serviceBroadcast, serviceMonitor);
    }
}
