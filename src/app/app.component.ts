import { Component } from '@angular/core';
import { MatSnackBarRef, SimpleSnackBar, MatSnackBar } from '@angular/material/snack-bar';
import { ModelSnackBarDetails } from './models/snack-bar/snack-bar-details.model';
import { ServiceSnackBar } from './services/snack-bar.service/snack-bar.service';
import { AbstractServiceAuthentication } from './services/authentication.service/authentication.service.abstract';
import './helpers/navigation-helper';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    title = '{App Title}';
    snackbarRef: MatSnackBarRef<SimpleSnackBar> | undefined;
    // Don't remove the serviceAuthentication from the constructor, then login won't work
    constructor(
        private serviceAuthentication: AbstractServiceAuthentication,
        public snackBar: MatSnackBar, private serviceSnackBar: ServiceSnackBar
    ) {
        this.serviceSnackBar.onSnackbar.subscribe((snackbarDetails: ModelSnackBarDetails) => {
            this.openSnackBar(snackbarDetails);
        });

        this.serviceSnackBar.onDismissSnackbar.subscribe(() => {
            if (!!this.snackbarRef) {
                this.snackbarRef.dismiss();
            }
        });
    }

    openSnackBar(snackbarDetails: ModelSnackBarDetails): void {
        // Added timeout because snackbar has a bug that gives a error if displayed on Init of component
        setTimeout(() => {
            this.snackbarRef = this.snackBar.openFromComponent(
                snackbarDetails.factory.componentType
                , {
                    panelClass: ['custom-snackbar']
                });
            this.snackbarRef.onAction().subscribe(() => {
                if (!snackbarDetails || !snackbarDetails.callbackOnAction) {
                    throw new Error('Snackbar on app component is not initialized');
                }
                snackbarDetails.callbackOnAction();
            });
        }, 100);
    }
}
