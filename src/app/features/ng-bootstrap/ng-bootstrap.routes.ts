import { Routes } from '@angular/router';

export const ngBootstrapRoutes: Routes  = [
  { path: '', loadComponent: () => import('./pages/index/index').then(m => m.Index) },
];
