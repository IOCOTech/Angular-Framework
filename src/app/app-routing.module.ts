import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OidRedirectComponent } from './components/oid-redirect/oid-redirect.component';
import { Enums } from './enums/enums';
import { AbstractRouteGuard } from './modules/microsoft-authentication-library/route-guard/route-mock.guard.abstract';

const routes: Routes = [
    { path: '', redirectTo: Enums.NavigationRoutesForRouter.Home, pathMatch: 'full' },
    { path: Enums.NavigationRoutesForRouter.Home, component: HomeComponent },
    // { path: Enums.NavigationRoutesForRouter.Home, component: HomeComponent, canActivate: [AbstractRouteGuard] },
    { path: Enums.NavigationRoutesForRouter.Oid, component: OidRedirectComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
