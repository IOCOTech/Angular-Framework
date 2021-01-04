import { TestBed } from '@angular/core/testing';
import { UnitTestModule } from 'src/app/unit-tests-helpers/unit-test.module';

import { ServiceMonitoring } from './monitor.service';

describe('MonitorService', () => {
  let service: ServiceMonitoring;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UnitTestModule
      ]
    });
    service = TestBed.inject(ServiceMonitoring);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
