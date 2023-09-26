import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/dialog-boxes/error-dialog/error-dialog.component';
import { Enums } from 'src/app/enums/enums';
import { ModelErrorDialogConfig } from 'src/app/models/dialog-data/error-dialog-config.model';
import * as Models from 'src/app/models/models';
import { ServiceMonitoring } from '../monitor/monitor.service';

@Injectable({
    providedIn: 'root'
})
export class ServiceErrorHandler {

    constructor(private serviceMonitoring: ServiceMonitoring, private dialog: MatDialog) { }

    /**
     * Display a dialog box with a user friendly error message.
     *
     * @param origin - The class calling the method.  Pass in 'this' if you're unsure about what to use otherwise just a string as the name
     * @param errorMessage - A user friendly error message
     * @param header A custom header if required. Defaults to 'Error'.
     * @param icon The icon to display on the dialog box. Defaults to 'Error'.  See 'Enums.MaterialIcons' for other options.
     * @param displayReportIssueButton If set to true the dialog will display a button for the user to add additional info about the issue.
     * @param error If you have access to a 'Error' object supply this parameter.
     */
    displayErrorDialog(
        origin: any, errorMessage: string, header: string = 'Error',
        icon = Enums.MaterialIcons.Error,
        displayReportIssueButton: boolean = false,
        error?: Error
    ): void {
        const errorToLog = error ?? errorMessage;
        this.serviceMonitoring.logException(origin, errorToLog);
        const config: ModelErrorDialogConfig = Models.Initialize.ErrorDialog.ErrorDialogConfig(
            errorMessage, header, icon, displayReportIssueButton
        );
        this.dialog.open(ErrorDialogComponent, { data: config }).afterClosed().subscribe((reportIssue: string) => {
            if (reportIssue === 'true') {
                this.serviceMonitoring.logException(origin, 'Additional info on error logged');
            }
        });
    }
}
