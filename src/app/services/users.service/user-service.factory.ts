import { HttpClient } from '@angular/common/http';
import { MockServiceUser } from './user.service.mock';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { AppSettings } from 'src/environments/app-settings/app-settings';
import { ServiceMonitoring } from '../monitor.service/monitor.service';
import { Enums } from 'src/app/enums/enums';

export function FactoryServiceUser(http: HttpClient, endpoints: AbstractEndpoints, serviceMonitor: ServiceMonitoring) {
    serviceMonitor.logEvent('FactoryServiceUser', 'User Service Factory loaded');
    switch (AppSettings.environment) {
        case Enums.Environments.MockData:
            return new  MockServiceUser(endpoints, http);
        default:
            return new  MockServiceUser(endpoints, http);
            // return new ServiceUser(endpoints, http);
    }
}
