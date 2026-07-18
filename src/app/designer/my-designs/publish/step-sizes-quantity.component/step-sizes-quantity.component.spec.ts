import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSizesQuantityComponent } from './step-sizes-quantity.component';

describe('StepSizesQuantityComponent', () => {
  let component: StepSizesQuantityComponent;
  let fixture: ComponentFixture<StepSizesQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepSizesQuantityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepSizesQuantityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
