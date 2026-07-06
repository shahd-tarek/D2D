import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewAddress } from './add-new-address';

describe('AddNewAddress', () => {
  let component: AddNewAddress;
  let fixture: ComponentFixture<AddNewAddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewAddress],
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewAddress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
