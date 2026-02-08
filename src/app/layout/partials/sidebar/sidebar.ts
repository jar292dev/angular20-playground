import { Component, inject } from '@angular/core';
import { MenuService } from '../../../core/services/menu.service';
import { UiService } from '../../../core/services/ui.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from '../../../core/models/menu.model';
import { NgTemplateOutlet } from '@angular/common';

/**
 * Componente del sidebar que muestra el menú de navegación y permite colapsar/expandir el sidebar.
 */

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar {
  private router = inject(Router);
  private menuService = inject(MenuService);
  private uiService = inject(UiService);
  isCollapsed = this.uiService.isSidebarCollapsed;
  
  // Obtenemos el Signal del servicio (Readonly)
  menuItems = this.menuService.menuItems;

  toggle(item: MenuItem) {
    if (item.children) {
      // Como el signal del servicio es readonly, manejamos el estado localmente
      // o podrías añadir un método en el servicio para mutar el estado.
      item.expanded = !item.expanded;
    }
  }

  hasActiveChild(item: MenuItem): boolean {
    if (!item.children) return false;
    return item.children.some(child => 
      this.router.isActive(child.route || '', false) || this.hasActiveChild(child)
    );
  }
}
