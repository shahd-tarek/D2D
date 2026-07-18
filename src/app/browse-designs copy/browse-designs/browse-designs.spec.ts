import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseDesigns } from './browse-designs';

describe('BrowseDesigns', () => {
  let component: BrowseDesigns;
  let fixture: ComponentFixture<BrowseDesigns>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseDesigns],
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseDesigns);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
