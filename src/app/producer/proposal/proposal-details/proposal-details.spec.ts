import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalDetails } from './proposal-details';

describe('ProposalDetails', () => {
  let component: ProposalDetails;
  let fixture: ComponentFixture<ProposalDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ProposalDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
