import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedTimingModesComponent } from './led-timing-modes.component';

describe('LedTimingModesComponent', () => {
  let component: LedTimingModesComponent;
  let fixture: ComponentFixture<LedTimingModesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedTimingModesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedTimingModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
