import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OidRedirectComponent } from './oid-redirect.component';

describe('OidRedirectComponent', () => {
  let component: OidRedirectComponent;
  let fixture: ComponentFixture<OidRedirectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OidRedirectComponent]
    });
    fixture = TestBed.createComponent(OidRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
