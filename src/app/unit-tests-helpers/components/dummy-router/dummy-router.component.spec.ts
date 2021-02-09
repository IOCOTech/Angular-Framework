import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyRouterComponent } from './dummy-router.component';

describe('DummyRouterComponent', () => {
  let component: DummyRouterComponent;
  let fixture: ComponentFixture<DummyRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DummyRouterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
