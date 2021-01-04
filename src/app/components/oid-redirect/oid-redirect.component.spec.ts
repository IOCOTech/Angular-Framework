import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UnitTestModule } from 'src/app/unit-tests-helpers/unit-test.module';

import { OidRedirectComponent } from './oid-redirect.component';

describe('OidRedirectComponent', () => {
  let component: OidRedirectComponent;
  let fixture: ComponentFixture<OidRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UnitTestModule],
      declarations: [ OidRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OidRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
