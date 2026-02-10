import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputContainer } from './output-container';

describe('OutputContainer', () => {
  let component: OutputContainer;
  let fixture: ComponentFixture<OutputContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
