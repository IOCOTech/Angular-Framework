import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ServiceConfig } from '../services/config/config.service';
import { ServiceLoadingScreen } from '../services/loading-screen/loading-screen.service';


@Injectable()
export class InterceptorLoadingScreen implements HttpInterceptor {

    activeRequests = 0;

    /**
     * URLs for which the loading screen should not be enabled
     */
    skipUrls: string[] = [];

    constructor(private loadingScreenService: ServiceLoadingScreen, private serviceConfig: ServiceConfig) {
        // this.skipUrls.push('url that should be skipped')
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let displayLoadingScreen = true;

        for (const skipUrl of this.skipUrls) {
            if (new RegExp(skipUrl).test(request.url)) {
                displayLoadingScreen = false;
                break;
            }
        }

        if (displayLoadingScreen) {
            if (this.activeRequests === 0) {
                this.loadingScreenService.startLoading();
            }
            this.activeRequests++;

            return next.handle(request).pipe(
                finalize(() => {
                    this.activeRequests--;
                    if (this.activeRequests === 0) {
                        this.loadingScreenService.stopLoading();
                    }
                })
            );
        } else {
            return next.handle(request);
        }
    }
}
