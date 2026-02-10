import { Injectable } from "@angular/core";
import { ToastContainer } from "../components/toast-container/toast-container";


@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private container?: ToastContainer;

  register(container: ToastContainer) {
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