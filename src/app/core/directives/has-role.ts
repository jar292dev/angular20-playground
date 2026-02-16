import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRole } from '../enums/roles.enum';
import { AuthService } from '../services/auth.service';

/**
 * Directiva estructural para mostrar u ocultar elementos del DOM según los roles del usuario.
 * Uso:
 * <div *appHasRole="['ADMIN', 'MODERATOR']">Contenido visible solo para ADMIN y MODERATOR</div>
 */

@Directive({
  selector: '[appHasRole]'
})
export class HasRole {

  private roles: UserRole[] = [];

  @Input() 
  set appHasRole(roles: UserRole | UserRole[]) {
    this.roles = Array.isArray(roles) ? roles : [roles];
    this.updateView();
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.updateView();
  }

  private updateView() {
    // const userRoles = this.authService.getUserRoles();
    // const hasRole = this.roles.some(role => userRoles.includes(role));

    const hasRole = this.authService.hasRole(this.roles);


    if (hasRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
