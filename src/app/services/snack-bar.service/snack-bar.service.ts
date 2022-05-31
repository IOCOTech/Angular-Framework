import { ComponentType } from '@angular/cdk/portal';
import { EventEmitter, Injectable } from '@angular/core';
import { ModelSnackBarDetails } from 'src/app/models/snack-bar/snack-bar-details.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceSnackBar {

    onSnackbar: EventEmitter<ModelSnackBarDetails> = new EventEmitter<ModelSnackBarDetails>();
    onDismissSnackbar = new EventEmitter();
    private callbackOnAction: ((response?: any) => void) | undefined;

    showSnackbar(componentToShow: ComponentType<any>, callbackFunction?: (response?: any) => void): void {
        const details = new ModelSnackBarDetails(componentToShow, callbackFunction);
        this.onSnackbar.emit(details);
    }

    dismissSnackBar(response?: any): void {
        if (this.callbackOnAction){
            this.callbackOnAction(response);
        }
        this.onDismissSnackbar.emit();
    }
}
