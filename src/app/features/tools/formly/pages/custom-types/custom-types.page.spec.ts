import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTypesPage } from './custom-types.page';

describe('CustomTypesPage', () => {
  let component: CustomTypesPage;
  let fixture: ComponentFixture<CustomTypesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomTypesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
