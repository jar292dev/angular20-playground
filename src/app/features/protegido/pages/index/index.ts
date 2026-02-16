import { Component, inject, signal } from '@angular/core';
import { OutputContainer } from '../../../../shared/components/output-container/output-container';
import { Breadcrumbs } from '../../../../shared/components/breadcrumbs/breadcrumbs';
import { Login } from "../../components/login/login";
import { TestErrorService } from '../../../angular/errores/services/test-error.service';

@Component({
  selector: 'app-index',
  imports: [Breadcrumbs, OutputContainer, Login],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {
  private testErrorService = inject(TestErrorService);

  protected outputModel: any;
  protected outputBackend: any;

  // Migas de pan para la navegación
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Protegido', url: '/protegido' },
    { label: 'Index' },
  ];

  isSubmitting = signal(false);
  currentUser = signal({ email: 'test@test.com', password: 'Angular Developer' });

  handleUpdate(formData: any) {
    this.outputModel = formData;

    // Probar el servicio de errores con credenciales incorrectas
    this.isSubmitting.set(true);
    this.testErrorService.testLogin(formData.email, formData.password).subscribe({
      next: (response) => {
        this.outputBackend = response;
        this.isSubmitting.set(false);
      },
      error: (error) => {
        this.outputBackend = error;
        this.isSubmitting.set(false);
        throw error; // Re-lanzar el error para que el interceptor global lo capture
      }
    });
  }

  // Método para probar el servicio de errores

  
}
