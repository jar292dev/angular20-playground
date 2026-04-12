// credentials.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Interceptor para agregar la opción withCredentials a todas las solicitudes HTTP.
 * Esto permite que las cookies de autenticación se envíen automáticamente con cada solicitud, lo cual es esencial para mantener la sesión del usuario en aplicaciones que utilizan cookies para la autenticación.
 * Resumen: Este interceptor intercepta todas las solicitudes HTTP salientes y las modifica para incluir la opción withCredentials: true, asegurando que las cookies de autenticación se envíen con cada solicitud (Incluye el JWT).
 * @param req La solicitud HTTP entrante.
 * @param next El siguiente interceptor en la cadena.
 * @returns La solicitud HTTP modificada con la opción withCredentials habilitada.
 */

export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedReq = req.clone({ withCredentials: true });
  return next(clonedReq);
};