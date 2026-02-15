import { Routes } from '@angular/router';
import { UserRole } from '../../core/enums/roles.enum';

export const protegidoRoutes: Routes  = [
  { path: '', loadComponent: () => import('./pages/index/index').then(m => m.Index) },

  { path: 'pagina-admin', loadComponent: () => import('./pages/admin/admin').then(m => m.Admin), data: { roles: [UserRole.ADMIN] } },
  { path: 'pagina-moderador', loadComponent: () => import('./pages/moderator/moderator').then(m => m.Moderator), data: { roles: [UserRole.ADMIN, UserRole.MODERATOR] } },
  { path: 'pagina-usuario', loadComponent: () => import('./pages/user/user').then(m => m.User), data: { roles: [UserRole.ADMIN, UserRole.MODERATOR, UserRole.USER] } },

  // Otras rutas protegidas pueden ir aquí
];
