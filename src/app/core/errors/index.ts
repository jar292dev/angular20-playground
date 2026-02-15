// Exporta todo desde un solo lugar
export * from './app-error';
export * from './http-errors';
export * from './network-errors';
export * from './business-errors';

// Factory para crear errores desde HttpErrorResponse
import { HttpErrorResponse } from '@angular/common/http';
import { 
  BadRequestError, 
  UnauthorizedError, 
  ForbiddenError, 
  NotFoundError, 
  ValidationError,
  ServerError, 
  ServiceUnavailableError,
  NetworkError,
  TimeoutError,
  ConflictError,
  AppError 
} from './';

/**
 * Convierte un HttpErrorResponse en un error tipado de la aplicación
 */
export function fromHttpError(error: HttpErrorResponse): AppError {
  // Error de red (status 0)
  if (error.status === 0) {
    return new NetworkError();
  }

  // Timeout (name === 'TimeoutError')
/*   if (error.name === 'TimeoutError') {
    return new TimeoutError();
  } */

  // Errores HTTP específicos
  switch (error.status) {
    case 400:
      return new BadRequestError(
        error.error?.message || error.message,
        error.error
      );
    
    case 401:
      return new UnauthorizedError(
        error.error?.message || error.message,
        error.error
      );
    
    case 403:
      return new ForbiddenError(
        error.error?.message || error.message,
        error.error
      );
    
    case 404:
      return new NotFoundError(
        error.error?.message || error.message,
        error.error
      );
    
    case 409:
      return new ConflictError(
        error.error?.message || error.message,
        error.error
      );
    
    case 422:
      return new ValidationError(
        error.error?.message || 'Error de validación',
        error.error?.errors
      );
    
    case 500:
      return new ServerError(
        error.error?.message || error.message,
        error.error
      );
    
    case 503:
      return new ServiceUnavailableError(
        error.error?.message || error.message,
        error.error
      );
    
    case 504:
      return new TimeoutError('El servidor tardó demasiado en responder');
    
    default:
      return new AppError(
        error.error?.message || error.message,
        `HTTP_${error.status}`,
        error.status,
        error.error
      );
  }
}