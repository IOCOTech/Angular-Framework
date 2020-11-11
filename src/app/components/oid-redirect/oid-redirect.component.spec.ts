import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OidRedirectComponent } from './oid-redirect.component';

describe('OidRedirectComponent', () => {
  let component: OidRedirectComponent;
  let fixture: ComponentFixture<OidRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
