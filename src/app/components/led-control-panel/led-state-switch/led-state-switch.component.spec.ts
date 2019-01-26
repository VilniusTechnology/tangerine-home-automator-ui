import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedStateSwitchComponent } from './led-state-switch.component';

describe('LedStateSwitchComponent', () => {
  let component: LedStateSwitchComponent;
  let fixture: ComponentFixture<LedStateSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedStateSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedStateSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
