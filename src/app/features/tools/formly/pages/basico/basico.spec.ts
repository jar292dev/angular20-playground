import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Basico } from './basico';
import { provideRouter } from '@angular/router';
import { provideFormlyCore } from '@ngx-formly/core';
import { withFormlyBootstrap } from '@ngx-formly/bootstrap';

describe('Basico', () => {
  let component: Basico;
  let fixture: ComponentFixture<Basico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Basico],
      providers: [
        provideRouter([]), // Proporciona un enrutador vacío para las pruebas
        provideFormlyCore([ // Proporciona la configuración de Formly para las pruebas
          ...withFormlyBootstrap(), // Agrega los estilos de Bootstrap para Formly
        ]),
      ]
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
