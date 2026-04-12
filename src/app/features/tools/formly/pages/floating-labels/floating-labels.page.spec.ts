import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingLabelsPage } from './floating-labels.page';

describe('FloatingLabelsPage', () => {
  let component: FloatingLabelsPage;
  let fixture: ComponentFixture<FloatingLabelsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloatingLabelsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatingLabelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
