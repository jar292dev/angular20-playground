import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestErrorService {
  private http = inject(HttpClient);

  // === Probar peticion exitosa ===
  test200() {
    return this.http.get('http://localhost:3000/api/success');
  }

  // === Probar errores HTTP específicos ===
  testCode(code: number) {
    return this.http.get(`http://localhost:3000/api/error/${code}`);
  }

  // === Probar error de validación con detalles ===
  testValidationError() {
    return this.http.post('http://localhost:3000/api/validation-error', { name: '' });
  }

  // === Probar error de conflicto (409) ===
  testConflictError() {
    return this.http.post('http://localhost:3000/api/conflict', { id: 123 });
  }

  // Simula timeout
  testTimeout() {
    return this.http.get('http://localhost:3000/api/delay?seconds=15');
  }

  // URL inexistente para error de red
  testNetworkError() {
    return this.http.get('http://localhost:3000/api/connection-error');
  }
}