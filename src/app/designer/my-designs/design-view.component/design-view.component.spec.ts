import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignViewComponent } from './design-view.component';

describe('DesignViewComponent', () => {
  let component: DesignViewComponent;
  let fixture: ComponentFixture<DesignViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesignViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
