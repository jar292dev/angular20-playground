import { ErrorHandler, inject, Injectable } from '@angular/core';
import { ToastService } from '../../shared/services/toast.service';

/**
 * GlobalErrorHandler es una clase que implementa la interfaz ErrorHandler de Angular.
 * Su función principal es capturar cualquier error no manejado que ocurra en la aplicación y manejarlo de manera centralizada.
 * En este caso, cuando se captura un error, se muestra un mensaje de error utilizando el ToastService para notificar al usuario.
 * Además, se puede extender esta clase para enviar los errores a servicios de monitoreo como Sentry o LogRocket.
 */

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private toastService = inject(ToastService);
  handleError(error: any): void {
    // Aquí podrías enviar el error a Sentry o LogRocket
    console.error('Excepción capturada globalmente:', error);

    this.toastService.error(error.message || 'Se ha producido un error. Revisa la consola para más detalles.', 'Error');
  }
}