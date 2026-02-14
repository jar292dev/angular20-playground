import { Routes } from '@angular/router';

export const formlyRoutes: Routes  = [
  { path: '', loadComponent: () => import('./pages/index/index').then(m => m.Index) },
  { path: 'basico', loadComponent: () => import('./pages/basico/basico').then(m => m.Basico) }
];
