import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { filter } from 'rxjs/internal/operators/filter';
import { MenuService } from '../../../services/menu.service';
import { UiService } from '../../../services/ui.service';
import { MenuItem } from '../../../models/menu.model';

/**
 * Componente del sidebar que muestra el menú de navegación y permite colapsar/expandir el sidebar.
 */

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss'],
})
export class Sidebar implements OnInit {
  private router = inject(Router);
  private menuService = inject(MenuService);
  private uiService = inject(UiService);
  private cdr = inject(ChangeDetectorRef);
  
  isCollapsed = this.uiService.isSidebarCollapsed;
  
  // Obtenemos el Signal del servicio (Readonly)
  menuItems = this.menuService.menuItems;

ngOnInit() {
    // Solo expandimos automáticamente al iniciar la app
  setTimeout(() => {
      this.expandActiveRecursive(this.menuItems());
      this.cdr.detectChanges(); // Forzamos a Angular a ver que 'expanded' ahora es true
    }, 100);
  }

  toggle(item: MenuItem) {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  // Esta función es vital para el CSS
  isParentActive(item: MenuItem): boolean {
    return this.hasActiveChild(item);
  }

  hasActiveChild(item: MenuItem): boolean {
    if (!item.children) return false;
    return item.children.some(child => 
      (child.route && this.router.isActive(child.route, {
        matrixParams: 'ignored',
        queryParams: 'ignored',
        paths: 'exact',
        fragment: 'ignored'
      })) || this.hasActiveChild(child)
    );
  }

  private expandActiveRecursive(items: MenuItem[]) {
    if (!items) return;
    
    items.forEach(item => {
      if (this.hasActiveChild(item)) {
        item.expanded = true;
        if (item.children) this.expandActiveRecursive(item.children);
      }
    });
  }
}
