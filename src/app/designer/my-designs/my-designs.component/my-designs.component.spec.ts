import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDesignsComponent } from './my-designs.component';

describe('MyDesignsComponent', () => {
  let component: MyDesignsComponent;
  let fixture: ComponentFixture<MyDesignsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDesignsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyDesignsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
