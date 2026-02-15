import { Component, inject, output } from '@angular/core';
import { Breadcrumbs } from "../../../../shared/components/breadcrumbs/breadcrumbs";
import { OutputContainer } from "../../../../shared/components/output-container/output-container";
import { TestErrorService } from '../../../angular/errores/services/test-error.service';
import { AppError, ConflictError, NotFoundError } from '../../../../core/errors';

@Component({
  selector: 'app-index',
  imports: [Breadcrumbs, OutputContainer],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {
  private testService = inject(TestErrorService);
  protected output: any = null;

  // Migas de pan para la navegación
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Experimental' }
  ];

  // === Métodos para lanzar errores manualmente ===
  throwSystemError() {
    throw new AppError("Error del sistema simulado", "SYSTEM_ERROR", 500);
  }

  throwVersionConflictError() {
    throw new ConflictError('Conflicto de versión detectado');
  }

  throwResourceNotFoundError() {
    throw new NotFoundError('Recurso con ID 12345 no encontrado');
  }

  // === Métodos para probar llamadas HTTP ===
  testApiCallWithCode(code: number) {
    this.testService.testCode(code).subscribe({
      next: (data) => {
        this.output = data;
      },
      error: (error) => {
        this.output = error;
        throw error;
      }
    });
  }


  testTimeout() {
    this.testService.testTimeout().subscribe({
      next: (data) => {
        this.output = data;
      },
      error: (error) => {
        this.output = error;
        throw error;
      }
    });
  }
}
