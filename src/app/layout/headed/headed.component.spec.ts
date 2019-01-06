import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadedComponent } from './headed.component';

describe('HeadedComponent', () => {
  let component: HeadedComponent;
  let fixture: ComponentFixture<HeadedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
