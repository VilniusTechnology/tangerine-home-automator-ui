import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedControlPanelListComponent } from './led-control-panel-list.component';

describe('LedSlidersComponent', () => {
  let component: LedControlPanelListComponent;
  let fixture: ComponentFixture<LedControlPanelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedControlPanelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedControlPanelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
