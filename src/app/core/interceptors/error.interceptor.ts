import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AppError, AuthenticationError, AuthorizationError, BusinessError, NotFoundError, SystemError } from '../errors/errors';

/**
 * Interceptor global para manejar errores de negocio y técnicos de manera centralizada.
 * Captura errores HTTP, los transforma en objetos de error personalizados y los relanza.
 * Permite mostrar notificaciones al usuario o realizar logging antes de propagar el error.
 * @param req 
 * @param next 
 * @returns 
 */

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let customError;


      console.error('Http Error Interceptor Log (Raw):', error);
      switch (error.status) {
        case 401: // Unauthorized
          customError = new AuthenticationError();
          break;
        case 403: // Forbidden
            customError = new AuthorizationError();
            break;
        case 404: // Not Found
            customError = new NotFoundError();
            break;
        case 422: // Unprocessable Entity para negocio
          customError = new BusinessError();
          break;
        
        default:
          customError = new SystemError();
          break;
      }


      // Aquí podrías usar un servicio de notificaciones (Toast) antes de relanzar
      console.error('Http Error Interceptor Log:', customError);
      
      return throwError(() => customError);
    })
  );
};