import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetNumber } from './reset-number';

describe('ResetNumber', () => {
  let component: ResetNumber;
  let fixture: ComponentFixture<ResetNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetNumber],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetNumber);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
