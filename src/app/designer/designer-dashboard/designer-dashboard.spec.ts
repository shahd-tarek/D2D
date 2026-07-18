import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerDashboard } from './designer-dashboard';

describe('DesignerDashboard', () => {
  let component: DesignerDashboard;
  let fixture: ComponentFixture<DesignerDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignerDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(DesignerDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
