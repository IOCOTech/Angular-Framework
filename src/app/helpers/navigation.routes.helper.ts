
export class NavigationRoutes {

    static LandingPage = class {
        static path = '';
        static fullPath = '';
        static title = 'Home'
    }

    static Admin = class {
        static path = 'admin';
        static fullPath = 'admin';
        static title = ''
    }

    static Analysis = class {
        static path = 'analysis';
        static fullPath = `${NavigationRoutes.Admin.path}/${this.path}`;
        static title = 'Analytics'
    }
    
    static NotFound = class {
        static path = 'not-found';
        static fullPath = 'not-found';
        static title = 'Not Found'
    }
    
    static OpenIdConnectRedirectPage = class {
        static path = 'oid-redirect';
        static fullPath = 'oid-redirect';
        static title = 'Success'
    }
}