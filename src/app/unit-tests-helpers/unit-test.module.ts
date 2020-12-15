import { MaterialDesignModule } from '../modules/material-design/material-design.module';
import { AbstractServiceUser } from '../services/users.service/user.service.abstract';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { UnitTestHelpers } from './unit-test.helper';
import { HomeComponent } from '../components/home/home.component';


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
        MaterialDesignModule,
        NoopAnimationsModule,
        RouterModule.forRoot([])
    ],
    providers: [
        { provide: AbstractServiceUser, useValue: UnitTestHelpers.MockObjects.abstractServiceUser },
        // { provide: MAT_DIALOG_DATA, useValue: {} },
        // { provide: MatDialogRef, useValue: UnitTestHelpers.MockObjects.matDialogRef },
    ],
    // entryComponents: [CourseDialogComponent] TODO: Add dialog components here

})

export class UnitTestModule {

}
