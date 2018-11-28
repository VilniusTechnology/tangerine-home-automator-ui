import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedSlidersComponent } from './led-sliders.component';

describe('LedSlidersComponent', () => {
  let component: LedSlidersComponent;
  let fixture: ComponentFixture<LedSlidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedSlidersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
