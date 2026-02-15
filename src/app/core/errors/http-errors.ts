import { AppError } from './app-error';

/**
 * Error de solicitud incorrecta (HTTP 400)
 */
export class BadRequestError extends AppError {
  constructor(message: string = 'Solicitud incorrecta', details?: any) {
    super(message, 'BAD_REQUEST', 400, details);
    this.name = 'BadRequestError';
  }
}

/**
 * Error de autenticación (HTTP 401)
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'No autorizado. Por favor, inicia sesión.', details?: any) {
    super(message, 'UNAUTHORIZED', 401, details);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Error de acceso prohibido (HTTP 403)
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'No tienes permisos para acceder a este recurso', details?: any) {
    super(message, 'FORBIDDEN', 403, details);
    this.name = 'ForbiddenError';
  }
}

/**
 * Error de recurso no encontrado (HTTP 404)
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Recurso no encontrado', details?: any) {
    super(message, 'NOT_FOUND', 404, details);
    this.name = 'NotFoundError';
  }
}

/**
 * Error de conflicto (HTTP 409)
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Conflicto en la solicitud', details?: any) {
    super(message, 'CONFLICT', 409, details);
    this.name = 'ConflictError';
  }
}

/**
 * Error de validación (HTTP 422)
 */
export class ValidationError extends AppError {
  constructor(
    message: string = 'Error de validación',
    public validationErrors?: Record<string, string[]>
  ) {
    super(message, 'VALIDATION_ERROR', 422, validationErrors);
    this.name = 'ValidationError';
  }
}

/**
 * Error interno del servidor (HTTP 500)
 */
export class ServerError extends AppError {
  constructor(message: string = 'Error interno del servidor', details?: any) {
    super(message, 'SERVER_ERROR', 500, details);
    this.name = 'ServerError';
  }
}

/**
 * Servicio no disponible (HTTP 503)
 */
export class ServiceUnavailableError extends AppError {
  constructor(message: string = 'Servicio temporalmente no disponible', details?: any) {
    super(message, 'SERVICE_UNAVAILABLE', 503, details);
    this.name = 'ServiceUnavailableError';
  }
}