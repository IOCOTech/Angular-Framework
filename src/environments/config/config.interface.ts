// DON'T REMOVE OR SWAP FOR THE ENUMS IN THE ENUMS FOLDER IT BREAKS THE SCHEMA GENERATOR
enum ErrorSeverityLevel {
    Info = 1,
    Warning = 2,
    Error = 3,
    Critical = 4
}

export abstract class IConfig {
    apiBaseURL!: string;
    appInsightsKey!: string;
    authentication!: IAuthenticationConfig;
    logging!: ILogging;
}
interface IAuthenticationConfig {
    clientId: string;
    authority: string;
    validateAuthority: boolean;
    redirectUri: string;
    postLogoutRedirectUri: string;
    navigateToLoginRequestUrl: boolean;
}

interface IAzureStorageConfig {
    baseContainerName: string;
    storageURL: string;
    viewFilename: string;
}

interface ILogging {
    /**
     * Severity of error levels that should be logged:
     * @default "error"
     * @examples [ "console", "appInsights" ]
     */
    errorLogTo: string[];
    /**
     * Severity of error levels that should be logged:
     * @default "error"
     * @examples [ "info", "warning", "error", "critical" ]
     */
    loggingLevel: ErrorSeverityLevel | string;
}
