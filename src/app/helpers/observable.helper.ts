import { firstValueFrom, Observable } from 'rxjs';

declare module 'rxjs' {
    export interface Observable<T> {
        firstValue: () => Promise<T>;
    }
}

Observable.prototype.firstValue = function () {
    return firstValueFrom(this);
}
