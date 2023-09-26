import { ErrorHandler, Injectable } from '@angular/core';
import { DevErrorHandler } from 'dev-error-reporter';
import { AppSettings } from '../../environments/app-settings/app-settings';
import { Enums } from 'src/app/enums/enums';

@Injectable({ providedIn: 'root' })
export class ConsoleErrorHandler extends ErrorHandler {
    // Creates new instance, the instance ensures errors are not shown twice until dismisses
    private errorReporter = new DevErrorHandler({
        appendToElement: 'app-root', // <-- App root as defined in index.html
    });

    override handleError(error: any): void {
        if (AppSettings.environment != Enums.Environments.Production) {
            // <-- Managed in your own code, should never show in prod
            this.errorReporter.showError(error);
        }

        // Keep default behavior
        super.handleError(error);
    }
}
