import { AbstractRouteGuard } from './route-mock.guard.abstract';
import { AppSettings } from 'src/environments/app-settings/app-settings';
import { MockRouteGuard } from './route-mock.guard';
import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Enums } from 'src/app/enums/enums';

export function FactoryRouteGuard(
    msalGuardConfig: MsalGuardConfiguration,
    msalBroadcastService: MsalBroadcastService,
    authService: MsalService,
    location: Location,
    router: Router): AbstractRouteGuard {
    switch (AppSettings.environment) {
        case Enums.Environments.MockData:
            return new MockRouteGuard();
        default:
            return new MsalGuard(msalGuardConfig, msalBroadcastService, authService, location, router);
    }
}