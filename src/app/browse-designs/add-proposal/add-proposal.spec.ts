import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProposal } from './add-proposal';

describe('AddProposal', () => {
  let component: AddProposal;
  let fixture: ComponentFixture<AddProposal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddProposal],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProposal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
