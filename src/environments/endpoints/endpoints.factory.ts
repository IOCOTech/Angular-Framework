import { Endpoints } from 'src/environments/endpoints/endpoints';
import { EndpointsMock } from 'src/environments/endpoints/endpoints.mock';
import { AppSettings } from '../app-settings/app-settings';
import { ServiceConfig } from 'src/app/services/config.service/config.service';
import { ServiceMonitoring } from 'src/app/services/monitor.service/monitor.service';
import { Enums } from 'src/app/enums/enums';
import { AbstractEndpoints } from './endpoints.abstract';

export function FactoryEndpoints(serviceConfig: ServiceConfig, serviceMonitor: ServiceMonitoring): AbstractEndpoints {
    serviceMonitor.logEvent('FactoryEndpoints', 'Endpoints Factory loaded');
    switch (AppSettings.environment) {
        case Enums.Environments.MockData:
            return new EndpointsMock(serviceConfig);
        default:
            return new Endpoints(serviceConfig);
    }
}
