import { Injectable } from "@angular/core";
import { ToastContainer } from "../components/toast-container/toast-container";

/**
 * Definición de la interfaz Toast, que representa la estructura de un mensaje de toast.
 * Incluye propiedades para el título, mensaje, clase CSS y un retraso opcional para la desaparición del toast.
 */

export interface Toast {
  title: string;
  message: string;
  class: string;
  delay?: number;
}

/**
 * Servicio para mostrar notificaciones tipo toast en la aplicación.
 * Proporciona métodos para mostrar diferentes tipos de toasts (éxito, error, advertencia, información).
 * El servicio se encarga de registrar un contenedor de toasts y agregar nuevos toasts a ese contenedor.
 */

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private container?: ToastContainer;

  register(container: ToastContainer) { // Método para registrar el contenedor de toasts
    this.container = container;
  }

  error(message: string, title = 'Error') {
    this.show(message, title, 'text-bg-danger');
  }

  success(message: string, title = 'OK') {
    this.show(message, title, 'text-bg-success');
  }

  warning(message: string, title = 'Aviso') {
    this.show(message, title, 'text-bg-warning');
  }

  info(message: string, title = 'Info') {
    this.show(message, title, 'text-bg-info');
  }

  private show(message: string, title: string, cssClass: string) {
    if (!this.container) {
      console.warn('ToastContainer no registrado');
      return;
    }

    this.container.add({
      title,
      message,
      class: cssClass,
      delay: 5000
    });
  }

}