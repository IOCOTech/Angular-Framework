import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UnitTestModule } from 'src/app/unit-tests-helpers/unit-test.module';
import { AbstractEndpoints } from 'src/environments/endpoints/endpoints.abstract';
import { ServiceUser } from './user.service';

describe('ServiceUser', () => {
  let service: ServiceUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        UnitTestModule
      ],
      providers: [
        { provide: ServiceUser, useClass: ServiceUser, deps: [AbstractEndpoints, HttpClientTestingModule] }
      ]
    });
    service = TestBed.inject(ServiceUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
