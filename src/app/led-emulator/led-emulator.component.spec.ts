import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedEmulatorComponent } from './led-emulator.component';

describe('LedEmulatorComponent', () => {
  let component: LedEmulatorComponent;
  let fixture: ComponentFixture<LedEmulatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedEmulatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedEmulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
