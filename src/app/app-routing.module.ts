import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OidRedirectComponent } from './components/oid-redirect/oid-redirect.component';
import { Enums } from './enums/enums';

const routes: Routes = [
    { path: '', redirectTo: Enums.NavigationRoutesForRouter.Home, pathMatch: 'full' },
    { path: Enums.NavigationRoutesForRouter.Home, component: HomeComponent, },
    { path: Enums.NavigationRoutesForRouter.Oid, component: OidRedirectComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { enableTracing: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
