
import { Enums } from 'src/app/enums/enums';
import { ErrorSeverityLevel } from 'src/app/enums/separated-enums/error-severity-level.enum';

export function InitializeConfig(): IConfig {
    const config: IConfig = {
        apiBaseURL: '',
        appInsightsKey: '',
        authentication: {
            clientId: '',
            authority: '',
            validateAuthority: false,
            redirectUri: '',
            postLogoutRedirectUri: '',
            navigateToLoginRequestUrl: false
        },
        logging: {
            errorLogTo: ['console', 'appInsights'],
            loggingLevel: Enums.ErrorSeverityLevel.Error
        }
    };
    return config;
}

export interface IConfig {
    apiBaseURL: string;
    appInsightsKey: string;
    authentication: IAuthenticationConfig;
    logging: ILogging;
}

export interface IAuthenticationConfig {
    clientId: string;
    authority: string;
    validateAuthority: boolean;
    redirectUri: string;
    postLogoutRedirectUri: string;
    navigateToLoginRequestUrl: boolean;
}

export interface ILogging {
    errorLogTo: string[];
    loggingLevel: ErrorSeverityLevel | string;
}
