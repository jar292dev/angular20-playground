import { Routes } from '@angular/router';

export const experimentalRoutes: Routes  = [
  { path: '', loadComponent: () => import('./pages/index/index').then(m => m.Index) },
];
