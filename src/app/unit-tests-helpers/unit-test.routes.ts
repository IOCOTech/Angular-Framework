import { Routes } from '@angular/router';
import { Enums } from '../enums/enums';
import { DummyRouterComponent } from './components/dummy-router/dummy-router.component';

export const routesForUnitTesting: Routes = [
    { path: '', redirectTo: Enums.NavigationRoutesForRouter.Home, pathMatch: 'full' },
    { path: Enums.NavigationRoutesForRouter.Home, component: DummyRouterComponent },
    { path: Enums.NavigationRoutesForRouter.Oid, component: DummyRouterComponent },
    { path: Enums.NavigationRoutesForRouter.UserDetails, component: DummyRouterComponent }
];
