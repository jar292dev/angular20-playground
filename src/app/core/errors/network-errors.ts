import { AppError } from './app-error';

/**
 * Error de timeout
 */
export class TimeoutError extends AppError {
  constructor(message: string = 'La solicitud ha excedido el tiempo de espera', timeout?: number) {
    super(message, 'TIMEOUT_ERROR', 504, { timeout });
    this.name = 'TimeoutError';
  }
}

/**
 * Error de conexión (servidor caído, sin internet, etc.)
 */
export class NetworkError extends AppError {
  constructor(message: string = 'No se pudo conectar con el servidor. Verifica tu conexión.') {
    super(message, 'NETWORK_ERROR', 0);
    this.name = 'NetworkError';
  }
}

/**
 * Error de conexión rechazada
 */
export class ConnectionRefusedError extends AppError {
  constructor(message: string = 'Conexión rechazada. El servidor no está disponible.') {
    super(message, 'CONNECTION_REFUSED', 0);
    this.name = 'ConnectionRefusedError';
  }
}

/**
 * Error de CORS
 */
export class CorsError extends AppError {
  constructor(message: string = 'Error de CORS. El servidor no permite peticiones desde este origen.') {
    super(message, 'CORS_ERROR', 0);
    this.name = 'CorsError';
  }
}