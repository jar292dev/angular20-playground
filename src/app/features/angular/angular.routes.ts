import { Routes } from '@angular/router';

export const angularRoutes: Routes  = [
  { path: '', loadComponent: () => import('./index/index').then(m => m.Index) },
];
