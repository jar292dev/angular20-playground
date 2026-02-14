import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastContainer } from './toast-container';

describe('ToastContainer', () => {
  let component: ToastContainer;
  let fixture: ComponentFixture<ToastContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Aquí puedes agregar más pruebas para verificar el comportamiento del componente ToastContainer

  // Creame una prueba que verifique que el componente muestra correctamente un mensaje de toast cuando se le asigna un mensaje a la propiedad "message"
  it('should display a toast message when the "message" property is set', () => {
    const testToast = {
      title: 'Test Title',
      message: 'This is a test toast message',
      class: 'bg-success'
    };
    component.toasts = [testToast];
    fixture.detectChanges();

    const toastElement = fixture.nativeElement.querySelector('.toast-body');
    expect(toastElement).toBeTruthy();
    expect(toastElement.textContent).toContain(testToast.message);
  });
});
