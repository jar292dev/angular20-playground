import { Component, inject, output } from '@angular/core';
import { Breadcrumbs } from "../../../../shared/components/breadcrumbs/breadcrumbs";
import { OutputContainer } from "../../../../shared/components/output-container/output-container";
import { NotFoundError, SystemError, VersionConflictError } from '../../../../core/errors/errors';
import { TestErrorService } from '../../../angular/errores/services/test-error.service';

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
    throw new SystemError();
  }

  throwVersionConflictError() {
    throw new VersionConflictError();
  }

  throwResourceNotFoundError() {
    throw new NotFoundError('12345');
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
}
