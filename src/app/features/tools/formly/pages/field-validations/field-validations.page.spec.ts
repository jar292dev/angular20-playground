import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldValidationsPage } from './field-validations.page';

describe('FieldValidationsPage', () => {
  let component: FieldValidationsPage;
  let fixture: ComponentFixture<FieldValidationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldValidationsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldValidationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
