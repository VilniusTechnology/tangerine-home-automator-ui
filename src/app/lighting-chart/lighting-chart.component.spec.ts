import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LightingChartComponent } from './lighting-chart.component';

describe('LightingChartComponent', () => {
  let component: LightingChartComponent;
  let fixture: ComponentFixture<LightingChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LightingChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LightingChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
