import { Injectable } from '@angular/core';
import { ServiceConfig } from '../config.service/config.service';
import { ApplicationInsights, IEventTelemetry, IMetricTelemetry, IExceptionTelemetry } from '@microsoft/applicationinsights-web';
import { Enums } from 'src/app/enums/enums';
import { ErrorSeverityLevel } from 'src/app/enums/separated-enums/error-severity-level.enum';

@Injectable({
    providedIn: 'root'
})
export class ServiceMonitoring {

    private readonly microsoftVariableName = 'Microsoft';

    // tslint:disable-next-line:variable-name
    private _userId: string | undefined;
    get userId(): string | undefined {
        return this._userId;
    }
    set userId(value: string | undefined) {
        this._userId = value;
        if (value) {
            this.appInsights = new ApplicationInsights({
                config: {
                    accountId: value,
                    instrumentationKey: this.serviceConfig.appInsightsKey,
                    appId: this.serviceConfig.authentication.clientId,
                    enableCorsCorrelation: true,
                    enableAutoRouteTracking: true
                }
            });
            this.appInsights.loadAppInsights();
        }
    }

    loggingLevel = Enums.ErrorSeverityLevel.Info;
    logTo: string[] = [];
    appInsights!: ApplicationInsights;

    constructor(private serviceConfig: ServiceConfig) {
        this.loggingLevel = serviceConfig.logging.loggingLevel as ErrorSeverityLevel;
        this.logTo = serviceConfig.logging.errorLogTo;

        if (serviceConfig.appInsightsKey) {
            this.appInsights = new ApplicationInsights({
                config: {
                    instrumentationKey: serviceConfig.appInsightsKey,
                    appId: serviceConfig.authentication.clientId,
                    enableAutoRouteTracking: true
                }
            });
            this.appInsights.loadAppInsights();
        } else {
            console.error('Error initializing application insights');
        }
    }

    /**
     * Log a event.
     *
     * @remarks
     * This will log a event to variaous targets depending on the configuration in the config.json.
     *
     * @param origin - The class calling the method.  Pass in 'this' if you're unsure about what to use otherwise just a string as the name
     * @param descriptionOfEvent - A short description of the event
     * @param properties map[string, string] - additional data used to filter events and metrics in the portal. Defaults to the origin name.
     */
    logEvent(origin: any, descriptionOfEvent: string, properties?: { [key: string]: any }) {
        const originName = this.getOriginName(origin);
        if (this.logTo.includes('console')) {
            if (this.loggingLevel === Enums.ErrorSeverityLevel.Info) {
                console.log(`${originName}: `, descriptionOfEvent);
                if (properties) {
                    console.log('properties', properties);
                }
            }
        }
        // APPINSIGHTS
        if (this.logTo.includes('appInsights')) {
            if (this.loggingLevel === Enums.ErrorSeverityLevel.Info) {
                if (!properties) {
                    properties = { origin: originName };
                } else {
                    const originParameterName = 'origin';
                    properties[originParameterName] = originName;
                }
                this.addUserIdToProperties(properties);
                const telemetry: IEventTelemetry = {
                    name: descriptionOfEvent,
                    properties
                };
                this.appInsights.trackEvent(telemetry);
            }
        }
    }

    logMetric(nameOfMetric: string, averageOfMetric: number, propertiesToTrack?: { [key: string]: any }) {
        if (this.loggingLevel >= Enums.ErrorSeverityLevel.Info) {
            const metric: IMetricTelemetry = {
                name: nameOfMetric,
                average: averageOfMetric,
                properties: propertiesToTrack
            };
            this.appInsights.trackMetric(metric);
        }
    }

    /**
     * Log a exception.
     *
     * @param origin - The class calling the method.  Pass in 'this' if you're unsure about what to use otherwise just a string as the name
     * @param exception - The error or if a error doesn't exist just a string description of the error
     * @param properties - map[string, string] - additional data used to filter errors in the portal. Defaults to the origin name.
     * @param severityLevel - The severity of the error. Defaults to 'Error'
     */
    logException(
        origin: any, exception: Error | string,
        properties: { [key: string]: any } = {},
        severityLevel: ErrorSeverityLevel.Error | ErrorSeverityLevel.Critical = Enums.ErrorSeverityLevel.Error
    ) {
        const originName = this.getOriginName(origin);
        exception = typeof (exception) === 'string' ? new Error(exception) : exception;
        this.addUserIdToProperties(properties);
        this.addOriginToProperties(originName, properties);
        if (this.logTo.includes('console')) {
            console.error(originName, exception);
            console.log('Error properties:', properties);
        }
        if (this.logTo.includes('appInsights')) {
            const ex: IExceptionTelemetry = {
                exception,
                properties,
                severityLevel
            };
            this.appInsights.trackException(ex);
        }
    }

    private getOriginName(origin: any): string {
        const originName = typeof (origin) === 'string' ? origin : origin?.constructor.name;
        return originName;
    }

    private addUserIdToProperties(properties: { [key: string]: any }) {
        if (this.userId) {
            const userParameterName = 'user';
            properties[userParameterName] = this.userId;
        }
    }

    private addOriginToProperties(origin: string, properties: { [key: string]: any }) {
        const originParameterName = 'origin';
        properties[originParameterName] = origin;
    }

    logTrace(message: string, properties?: { [key: string]: any }) {
        this.appInsights.trackTrace(name, properties);
    }
}
