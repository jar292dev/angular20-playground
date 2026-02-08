import { Injectable, signal } from '@angular/core';

/**
 * Servicio para manejar el estado de la interfaz de usuario, como el estado del sidebar.
 */

@Injectable({ providedIn: 'root' })
export class UiService {
  // Signal para el estado del sidebar (abierto/cerrado)
  isSidebarCollapsed = signal(false);

  toggleSidebar() {
    this.isSidebarCollapsed.update(state => !state);
  }
}