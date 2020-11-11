import { Injectable } from '@angular/core';
import {
    HttpRequest, HttpHandler, HttpEvent,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import { Observable, from } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

import { AuthResponse } from 'msal';
import { MsalService, BroadcastService } from '@azure/msal-angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: MsalService, private broadcastService: BroadcastService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const scopes = this.auth.getScopesForEndpoint(req.url);

        // If there are no scopes set for this request, do nothing.
        if (!scopes) {
            return next.handle(req);
        }

        let accessToken: string;

        // Acquire a token for this request, and attach as proper auth header.
        return from(
            this.auth.acquireTokenSilent({ scopes })
                .then((response: AuthResponse) => {
                    accessToken = response.accessToken;
                    const authenticationHeader = `Token ${localStorage.getItem('msal.idtoken')}`;
                    const authorizationHeader = `Bearer ${response.accessToken}`;
                    return req.clone({
                        setHeaders: {
                            Authentication: authenticationHeader,
                            Authorization: authorizationHeader
                        }
                    });
                })
        )
            .pipe(
                mergeMap(nextReq => next.handle(nextReq)),
                tap(
                    event => { },
                    err => {
                        if (err instanceof HttpErrorResponse && err.status === 401) {
                            this.auth.clearCacheForScope(accessToken);
                            this.broadcastService.broadcast('msal:notAuthorized', err.message);
                        }
                    }
                )
            );
    }
}
