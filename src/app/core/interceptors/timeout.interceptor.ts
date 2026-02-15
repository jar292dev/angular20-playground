import { HttpInterceptorFn } from '@angular/common/http';
import { timeout, catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { TimeoutError } from '../errors';

/**
 * Interceptor para manejar timeouts en las peticiones HTTP. Si una petición tarda más de un tiempo especificado, se lanza un error de timeout.
 * Este interceptor se puede configurar con un tiempo de espera personalizado y permite capturar el error de timeout para mostrar una notificación al usuario o realizar logging.
 * El error de timeout se identifica por su nombre 'TimeoutError' y se puede convertir en un error tipado en el interceptor de errores global.
 * @param req 
 * @param next 
 * @returns 
 */

export const timeoutInterceptor: HttpInterceptorFn = (req, next) => {
  // Timeout de 10 segundos por defecto
  const timeoutDuration = 10000;

  return next(req).pipe(
    /**
     * Aplica un timeout a la petición. Si el servidor no responde dentro del tiempo especificado, se lanza un error de timeout.
     * El operador timeout lanzará un error con name 'TimeoutError' que podemos capturar en el catchError.
     */
    timeout(timeoutDuration),
    catchError((error) => {
      if (error.name === 'TimeoutError') {
        // Crear un nuevo error de timeout con un mensaje más descriptivo
        const timeoutError = new TimeoutError(`La solicitud ha excedido el tiempo de espera de ${timeoutDuration / 1000} segundos`, timeoutDuration);
        
        // Log del error de timeout
        console.error('⏰ Timeout: El servidor no respondió a tiempo', timeoutError);
        
        // Re-lanzar el error de timeout en lugar del error original
        return throwError(() => timeoutError);
      }
      return throwError(() => error);
    })
  );
};