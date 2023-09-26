import { Routes } from '@angular/router';
import { Enums } from '../enums/enums';
import { DummyRouterComponent } from './unit-tests-root/dummy-router/dummy-router.component';

export const routesForUnitTesting: Routes = [
    { path: '', redirectTo: Enums.NavigationRoutesForRouter.UserDetails, pathMatch: 'full' },
    { path: Enums.NavigationRoutesForRouter.Oid, component: DummyRouterComponent },
    { path: Enums.NavigationRoutesForRouter.UserDetails, component: DummyRouterComponent }
];
