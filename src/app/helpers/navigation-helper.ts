import { Router } from '@angular/router';
import { Enums } from '../enums/enums';
import { ModelUser } from '../models/users/user-details.model';

//#region EXTENSION METHODS FOR ANGULAR ROUTER

class NavigationRoutes {

    Home = `${Enums.NavigationRoutesForRouter.Home}`;
    UserDetails = `${Enums.NavigationRoutesForRouter.UserDetails}`;
}

declare module '@angular/router' {
    export interface Router {
        Routes: NavigationRoutes;
        Navigation: NavigationHelper;
        InitializeExtensionMethods(): void;
    }
}
Router.prototype.Routes = new NavigationRoutes();

// tslint:disable-next-line:typedef
Router.prototype.InitializeExtensionMethods = function() {
    const router = (this as unknown as Router);
    if (!router.Navigation) {
        router.Navigation = new NavigationHelper(router);
    }
};

//#endregion

class NavigationHelper {

    navigationParameter: any;

    constructor(private router: Router) { }

    NavigateTo = {

        Home: () => {
            this.router.navigate([this.router.Routes.Home]);
        },

        UserDetails: (User: ModelUser) => {
            this.navigationParameter = User;
            this.router.navigate([`${this.router.Routes.UserDetails}`]);
        }
    };
}
