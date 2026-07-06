import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptOffer } from './accept-offer';

describe('AcceptOffer', () => {
  let component: AcceptOffer;
  let fixture: ComponentFixture<AcceptOffer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcceptOffer],
    }).compileComponents();

    fixture = TestBed.createComponent(AcceptOffer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
