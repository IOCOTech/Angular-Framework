import { MsalService, BroadcastService } from '@azure/msal-angular';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ServiceAuthentication } from './authentication.service';

describe('Service Authentictaion', () => {

    let serviceAuth: ServiceAuthentication;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                MsalService
                , BroadcastService
                , ServiceAuthentication
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);

    });

    it('should initialize', () => {
        serviceAuth = TestBed.inject(ServiceAuthentication);
    });

});
