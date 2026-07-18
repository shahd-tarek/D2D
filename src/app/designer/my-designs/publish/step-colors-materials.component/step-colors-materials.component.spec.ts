import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepColorsMaterialsComponent } from './step-colors-materials.component';

describe('StepColorsMaterialsComponent', () => {
  let component: StepColorsMaterialsComponent;
  let fixture: ComponentFixture<StepColorsMaterialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepColorsMaterialsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StepColorsMaterialsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
