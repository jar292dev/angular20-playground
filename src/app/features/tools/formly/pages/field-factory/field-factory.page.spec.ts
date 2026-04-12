import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldFactoryPage } from './field-factory.page';

describe('FieldFactoryPage', () => {
  let component: FieldFactoryPage;
  let fixture: ComponentFixture<FieldFactoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldFactoryPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldFactoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
