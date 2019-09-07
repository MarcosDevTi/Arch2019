import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamsGridDataRangeComponent } from './params-grid-data-range.component';

describe('ParamsGridDataRangeComponent', () => {
  let component: ParamsGridDataRangeComponent;
  let fixture: ComponentFixture<ParamsGridDataRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamsGridDataRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamsGridDataRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
