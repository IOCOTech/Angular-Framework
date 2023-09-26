import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbstractRouteGuard } from './modules/microsoft-authentication-library/route-guard/route-mock.guard.abstract';
import { NavigationRoutes } from './helpers/navigation.routes.helper';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
        { path: '', component: NotFoundComponent },
        { path: NavigationRoutes.NotFound.path, component: NotFoundComponent, canActivate: [AbstractRouteGuard]  }
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
