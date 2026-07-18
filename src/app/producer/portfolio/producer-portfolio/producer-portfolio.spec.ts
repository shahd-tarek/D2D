import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducerPortfolio } from './producer-portfolio';

describe('ProducerPortfolio', () => {
  let component: ProducerPortfolio;
  let fixture: ComponentFixture<ProducerPortfolio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducerPortfolio],
    }).compileComponents();

    fixture = TestBed.createComponent(ProducerPortfolio);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
