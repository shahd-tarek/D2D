import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepReviewComponent } from './step-review.component';

describe('StepReviewComponent', () => {
  let component: StepReviewComponent;
  let fixture: ComponentFixture<StepReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepReviewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
