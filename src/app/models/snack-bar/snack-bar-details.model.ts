import { ComponentType } from '@angular/cdk/portal';

export class ModelSnackBarDetails {
    componentRef: ComponentType<any>;
    callbackOnAction: ((response?: any) => void) | undefined;

    constructor(componentRef: ComponentType<any>, callbackOnAction?: (response?: any) => void) {
        this.componentRef = componentRef;
        this.callbackOnAction = callbackOnAction;
    }
}
