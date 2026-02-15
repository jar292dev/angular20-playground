import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";

/**
 * SIN PROBAR!
 * AuthGuard es una clase que implementa la interfaz CanActivate de Angular.
 * Su función principal es proteger rutas específicas de la aplicación, asegurándose de que solo los usuarios autenticados y con los roles adecuados puedan acceder a ellas.
 * El guard verifica si el usuario está autenticado utilizando el AuthService. Si no lo está, redirige al usuario a la página de login.
 * Si la ruta requiere roles específicos, el guard también verifica si el usuario tiene alguno de esos roles antes de permitir el acceso.
 * En caso de que el usuario no tenga los roles necesarios, se redirige a una página de acceso denegado (forbidden).
 */


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {

    // Verificar si el usuario está autenticado
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/login']);
    }

    // Obtener los roles requeridos para la ruta desde los datos de la ruta
    const requiredRoles = route.data?.['roles'] as string[];

    // Si no se requieren roles específicos, permitir acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No requiere rol específico
    }

    // Verificar si el usuario tiene alguno de los roles requeridos
    const hasAccess = this.authService.hasRole(requiredRoles);

    // Si el usuario tiene el rol requerido, permitir acceso; de lo contrario, redirigir a la página de acceso denegado
    return hasAccess
      ? true
      : this.router.createUrlTree(['/forbidden']);
  }
}