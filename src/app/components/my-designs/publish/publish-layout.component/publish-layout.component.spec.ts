import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishLayoutComponent } from './publish-layout.component';

describe('PublishLayoutComponent', () => {
  let component: PublishLayoutComponent;
  let fixture: ComponentFixture<PublishLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublishLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
