import { TestBed } from '@angular/core/testing';

import { ServiceErrorHandler } from './error-handler.service';

describe('ServiceErrorHandler', () => {
  let service: ServiceErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceErrorHandler);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
