import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuplishDesignComponent } from './puplish-design.component';

describe('PuplishDesignComponent', () => {
  let component: PuplishDesignComponent;
  let fixture: ComponentFixture<PuplishDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PuplishDesignComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PuplishDesignComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
