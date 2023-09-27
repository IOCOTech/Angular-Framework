import { Type } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationRoutes } from './navigation.routes.helper';

//#region EXTENSION METHODS FOR ANGULAR ROUTER

declare module '@angular/router' {
    export interface Router {
        Routes: NavigationRoutes;
        NavigateTo: NavigationHelper;
        GetNavigationParameter<T>(component: Type<any>): T;
        InitializeExtensionMethods(): void;
    }
}

Router.prototype.InitializeExtensionMethods = function () {
    const router = (this as unknown as Router);
    if (!router.NavigateTo) {
        router.NavigateTo = new NavigationHelper(router);
    }
};

const parameters: { [key: string]: any } = {};

Router.prototype.GetNavigationParameter = function <T>(component: Type<any>) {
    return parameters[nameOf(component)] as T;
};

//#endregion

function nameOf<T extends new (...args: any[]) => any>(classType: T): string {
    return classType.name;
}

class NavigationHelper {

    constructor(private router: Router) { }
    
    Analytics(ids: string[], fromDate: Date, toDate: Date): void {
        // parameters[nameOf(AnalysisComponent)] = { fromDate: fromDate, toDate: toDate };
        this.router.navigate([`${NavigationRoutes.Analysis.fullPath}/${ids.join("&")}`]);
    }
    Home(): void {
        this.router.navigate([`${NavigationRoutes.LandingPage.fullPath}`]);
    }

    NotFound(): void {
        this.router.navigate([`${NavigationRoutes.NotFound.fullPath}`]);
    }
}
