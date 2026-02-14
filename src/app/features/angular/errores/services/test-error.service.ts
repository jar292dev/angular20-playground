import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestErrorService {
  private http = inject(HttpClient);

  test200() {
    return this.http.get('http://localhost:3000/api/success');
  }

  testCode(code: number) {
    return this.http.get(`http://localhost:3000/api/error/${code}`);
  }  

  // Simula timeout
  testTimeout() {
    return this.http.get('http://localhost:3000/api/slow');
  }

  // URL inexistente para error de red
  testNetworkError() {
    return this.http.get('http://localhost:3000/api/connection-error');
  }
}