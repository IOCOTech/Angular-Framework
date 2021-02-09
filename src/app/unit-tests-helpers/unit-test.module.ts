import { HttpBackend } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { MaterialDesignModule } from '../modules/material-design/material-design.module';
import { AbstractServiceAuthentication } from '../services/authentication.service/authentication.service.abstract';
import { ServiceConfig } from '../services/config.service/config.service';
import { ServiceErrorHandler } from '../services/error-handler.service/error-handler.service';
import { ServiceMonitoring } from '../services/monitor.service/monitor.service';
import { AbstractServiceUser } from '../services/users.service/user.service.abstract';
import './../helpers/navigation-helper';
import { UnitTestHelpers } from './unit-test.helper';


const modules = [
    HttpClientTestingModule,
    MaterialDesignModule,
    NoopAnimationsModule,
    RouterTestingModule
];

@NgModule({
    imports: modules,
    exports: modules,
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
    ]
    // entryComponents: [CourseDialogComponent] TODO: Add dialog components here

})

export class UnitTestModule {

    constructor(router: Router) {
        router.InitializeExtensionMethods();
    }
}
