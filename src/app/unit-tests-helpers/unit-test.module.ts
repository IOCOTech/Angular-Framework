import { MaterialDesignModule } from '../modules/material-design/material-design.module';
import { AbstractServiceUser } from '../services/users.service/user.service.abstract';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UnitTestHelpers } from './unit-test.helper';
import { HomeComponent } from '../components/home/home.component';
import { AbstractServiceAuthentication } from '../services/authentication.service/authentication.service.abstract';
import { ServiceMonitoring } from '../services/monitor.service/monitor.service';
import { ServiceConfig } from '../services/config.service/config.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { EndpointsMock } from 'src/environments/endpoints/endpoints.mock';
import { HttpBackend } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServiceErrorHandler } from '../services/error-handler.service/error-handler.service';


const components = [
    HomeComponent
    // UserMasterComponent,
    // UserSearchComponent,
    // SideMenuComponent
];

@NgModule({
    declarations: components,
    exports: components,
    imports: [
        HttpClientTestingModule,
        MaterialDesignModule,
        NoopAnimationsModule,
        RouterModule.forRoot([])
    ],
    providers: [
        { provide: AbstractServiceAuthentication, useValue: UnitTestHelpers.MockObjects.abstractServiceAuthentication },
        { provide: AbstractEndpoints, useValue: UnitTestHelpers.MockObjects.abstractAbstractEndpoints },
        { provide: AbstractServiceUser, useValue: UnitTestHelpers.MockObjects.abstractServiceUser },
        { provide: HttpBackend, useValue: {} },
        { provide: ServiceConfig, useValue: UnitTestHelpers.MockObjects.abstractServiceConfig },
        { provide: ServiceErrorHandler, useValue: UnitTestHelpers.MockObjects.abstractServiceConfig },
        { provide: ServiceMonitoring, useValue: UnitTestHelpers.MockObjects.serviceMonitoring },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ],
    // entryComponents: [CourseDialogComponent] TODO: Add dialog components here

})

export class UnitTestModule {

}
