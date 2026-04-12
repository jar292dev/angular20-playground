import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldRowsPage } from './field-rows.page';

describe('FieldRowsPage', () => {
  let component: FieldRowsPage;
  let fixture: ComponentFixture<FieldRowsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldRowsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldRowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
