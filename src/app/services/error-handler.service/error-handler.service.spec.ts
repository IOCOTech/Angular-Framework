import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { UnitTestModule } from 'src/app/unit-tests-helpers/unit-test.module';
import { ServiceMonitoring } from '../monitor.service/monitor.service';

import { ServiceErrorHandler } from './error-handler.service';

describe('ServiceErrorHandler', () => {
  let service: ServiceErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UnitTestModule
      ],
      providers: [
        { provide: ServiceErrorHandler, useClass: ServiceErrorHandler, deps: [ServiceMonitoring, MatDialog] }
      ]
    });
    service = TestBed.inject(ServiceErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
