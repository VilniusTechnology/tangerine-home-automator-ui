import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightomatorComponent } from './lightomator.component';

describe('LightomatorComponent', () => {
  let component: LightomatorComponent;
  let fixture: ComponentFixture<LightomatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightomatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightomatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
