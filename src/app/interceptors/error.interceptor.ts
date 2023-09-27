import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ServiceMonitoring } from '../services/monitor/monitor.service';

@Injectable()
export class InterceptorError implements HttpInterceptor {
  constructor(private serviceMonitor: ServiceMonitoring) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `HTTP Client-Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `HTTP Server-Error: Status: ${error.status}\nMessage: ${error.message}`;
        }
        this.serviceMonitor.logException(this, errorMessage, {
          requestContent: request,
          errorContent: error,
        });
        return throwError(errorMessage);
      })
    );
  }
}
