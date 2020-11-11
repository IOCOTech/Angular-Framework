import { EventEmitter, ComponentFactory, Injectable } from '@angular/core';
import * as Enums from 'src/app/enums/enums';
import { ModelSnackBarDetails } from 'src/app/models/snack-bar/snack-bar-details.model';

@Injectable({
    providedIn: 'root'
})
export class ServiceSnackBar {

    public onSnackbar: EventEmitter<ModelSnackBarDetails> = new EventEmitter<ModelSnackBarDetails>();
    public onDismissSnackbar = new EventEmitter();

    showSnackbar(factory: ComponentFactory<any>, callbackFunction?: () => void): void {
        const details = new ModelSnackBarDetails(factory, callbackFunction);
        this.onSnackbar.emit(details);
    }

    dismissSnackBar() {
        this.onDismissSnackbar.emit();
    }

}
