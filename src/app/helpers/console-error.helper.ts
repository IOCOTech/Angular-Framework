import { ErrorHandler, Injectable } from '@angular/core';
import { DevErrorHandler } from 'dev-error-reporter';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler extends ErrorHandler {
    // Creates new instance, the instance ensures errors are not shown twice until dismisses
    private errorReporter = new DevErrorHandler({
        appendToElement: 'app-root', // <-- App root as defined in index.html
    });

    handleError(error: any): void {
        if (!environment.production) {
            // <-- Managed in your own code, should never show in prod
            this.errorReporter.showError(error);
        }

        // Keep default behavior
        super.handleError(error);
    }
}
