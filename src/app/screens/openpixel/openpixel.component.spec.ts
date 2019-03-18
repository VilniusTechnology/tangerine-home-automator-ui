import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenpixelComponent } from './openpixel.component';

describe('OpenpixelComponent', () => {
  let component: OpenpixelComponent;
  let fixture: ComponentFixture<OpenpixelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenpixelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenpixelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
