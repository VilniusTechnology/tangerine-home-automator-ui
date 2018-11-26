import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedControlPanelComponent } from './led-control-panel.component';

describe('LedControlPanelComponent', () => {
  let component: LedControlPanelComponent;
  let fixture: ComponentFixture<LedControlPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedControlPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
