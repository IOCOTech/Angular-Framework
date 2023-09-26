import { TestBed } from '@angular/core/testing';

import { ServiceLoadingScreen } from './loading-screen.service';

describe('LoadingScreenService', () => {
  let service: ServiceLoadingScreen;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLoadingScreen);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
