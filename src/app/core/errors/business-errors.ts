import { AppError } from './app-error';

/**
 * Error de operación no permitida
 */
export class OperationNotAllowedError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 'OPERATION_NOT_ALLOWED', undefined, details);
    this.name = 'OperationNotAllowedError';
  }
}

/**
 * Error de recurso duplicado
 */
export class DuplicateError extends AppError {
  constructor(resource: string, field?: string) {
    const message = field 
      ? `El ${resource} con ese ${field} ya existe`
      : `El ${resource} ya existe`;
    super(message, 'DUPLICATE_ERROR', 409, { resource, field });
    this.name = 'DuplicateError';
  }
}

/**
 * Error de estado inválido
 */
export class InvalidStateError extends AppError {
  constructor(message: string, currentState?: string, requiredState?: string) {
    super(message, 'INVALID_STATE', undefined, { currentState, requiredState });
    this.name = 'InvalidStateError';
  }
}