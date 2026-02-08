import { Component, inject } from '@angular/core';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  uiService = inject(UiService);
  isCollapsed = this.uiService.isSidebarCollapsed;

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }
}
