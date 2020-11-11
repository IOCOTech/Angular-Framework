import {  ComponentFactory } from '@angular/core';

export class ModelSnackBarDetails {
    factory: ComponentFactory<any>;
    callbackOnAction: (() => void) | undefined;

    constructor(factory: ComponentFactory<any>, callbackOnAction?: () => void) {
        this.factory = factory;
        this.callbackOnAction = callbackOnAction;
    }
}
