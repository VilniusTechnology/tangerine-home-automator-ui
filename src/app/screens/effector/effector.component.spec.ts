import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectorComponent } from './effector.component';

describe('EffectorComponent', () => {
  let component: EffectorComponent;
  let fixture: ComponentFixture<EffectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EffectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
