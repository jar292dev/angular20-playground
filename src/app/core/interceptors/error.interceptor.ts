import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { fromHttpError } from '../errors'; // Importado desde el index.ts de errores para convertir HttpErrorResponse a AppError

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
      // Convierte el HttpErrorResponse a un error tipado
      const appError = fromHttpError(error);


      // Log del error
      console.error(`[${appError.name}]`, appError.toJSON());

      // Re-lanza el error tipado
      return throwError(() => appError)
    })
  );
};