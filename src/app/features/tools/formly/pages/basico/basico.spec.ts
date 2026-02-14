import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Basico } from './basico';

describe('Basico', () => {
  let component: Basico;
  let fixture: ComponentFixture<Basico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Basico]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Basico);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
