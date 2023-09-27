import { of } from 'rxjs';
import { Enums } from '../enums/enums';
import MockData from '../mock-data/db.json';
import { ModelAccountFromToken } from '../models/authorization/account-from-token.model';

export class UnitTestHelpers {

    static MockObjects = class {

        static abstractAbstractEndpoints = jasmine.createSpyObj('AbstractEndpoints', {

            user: {
                saveUser: '',
                getUserByUserId: (userId: string): string => {
                    return '';
                }
            }
        });

        static abstractServiceAuthentication = jasmine.createSpyObj('AbstractServiceAuthentication', {
            getAllUsers: of(MockData.users),

            isLoggedIn: of(false),

            account: (): ModelAccountFromToken | null => {
                return null;
            },

            registerForAuthenticationEvents: (): void => {
                return;
            },

            setRegisterAuthority: (): void => {
                return;
            },

            setLoginAuthority: (): void => {
                return;
            },

            logout: (): void => {
                return;
            }

        });

        static abstractServiceConfig = jasmine.createSpyObj('AbstractServiceAuthentication', {

            apiBaseURL: 'http://0.0.0.0',
            appInsightsKey: 'testing',
            authentication: {
                authority: 'testing',
                clientId: 'testing',
                navigateToLoginRequestUrl: false,
                postLogoutRedirectUri: 'testing',
                redirectUri: 'testing',
                validateAuthority: false
            },
            redirectUrl: 'testing',
            logging: {
                errorLogTo: [],
                loggingLevel: 'error'
            },

            loadConfig: (): Promise<void> => {
                return new Promise(res => setTimeout(res, 200));
            }
        });

        static abstractServiceUser = jasmine.createSpyObj('AbstractServiceUser', {
            getAllUsers: of(MockData.users),
        });

        static serviceErrorHandler = jasmine.createSpyObj('serviceErrorHandler', {
            displayErrorDialog: (
                origin: any, errorMessage: string, header: string = 'Error',
                icon = Enums.MaterialIcons.Error,
                displayReportIssueButton: boolean = false,
                error?: Error
            ): void => {
                return;
            }
        });

        static serviceMonitoring = jasmine.createSpyObj('AbstractServiceUser', {


            microsoftVariableName: 'Microsoft',

            userId: '1',

            loggingLevel: Enums.ErrorSeverityLevel.Info,
            logTo: [],
            appInsights: null,

            logEvent: (): void => {
                return;
            },

            logMetric: (): void => {
                return;
            },

            logException: (): void => {
                return;
            },

            getOriginName: (origin: any): string => {
                const originName = typeof (origin) === 'string' ? origin : origin?.constructor.name;
                return originName;
            },

            addUserIdToProperties: (properties: { [key: string]: any }): void => {
                return;
            },

            addOriginToProperties: (origin: string, properties: { [key: string]: any }): void => {
                return;
            },

            logTrace: (message: string, properties?: { [key: string]: any }): void => {
                return;
            }
        });
    };
}
