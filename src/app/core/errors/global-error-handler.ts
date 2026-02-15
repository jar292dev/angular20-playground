import { ErrorHandler, inject, Injectable, NgZone } from '@angular/core';
import { ToastService } from '../../shared/services/toast.service';
import { Router } from '@angular/router';

/**
 * GlobalErrorHandler es una clase que implementa la interfaz ErrorHandler de Angular.
 * Su función principal es capturar cualquier error no manejado que ocurra en la aplicación y manejarlo de manera centralizada.
 * En este caso, cuando se captura un error, se muestra un mensaje de error utilizando el ToastService para notificar al usuario.
 * Además, se puede extender esta clase para enviar los errores a servicios de monitoreo como Sentry o LogRocket.
 */

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private toastService = inject(ToastService);
  private readonly zone = inject(NgZone);
  private readonly router = inject(Router);

  handleError(error: any): void {
    console.error('Excepción capturada globalmente:', error);

    // Ejecutar el Toast dentro de la zona para que Angular detecte el cambio
    this.zone.run(() => {
      const message = error.message || 'Error inesperado';
      this.toastService.error(message, 'Error de Sistema');
    });
  }
}