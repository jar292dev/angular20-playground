import { Routes } from '@angular/router';

export const formlyRoutes: Routes  = [
  { path: '', loadComponent: () => import('./pages/index/index').then(m => m.Index) },
  { path: 'basico', loadComponent: () => import('./pages/basico/basico').then(m => m.Basico) },
  { path: 'custom-types', loadComponent: () => import('./pages/custom-types/custom-types.page').then(m => m.CustomTypesPage) },
  { path: 'floating-labels', loadComponent: () => import('./pages/floating-labels/floating-labels.page').then(m => m.FloatingLabelsPage) },
  { path: 'field-rows', loadComponent: () => import('./pages/field-rows/field-rows.page').then(m => m.FieldRowsPage) },
  { path: 'field-factory', loadComponent: () => import('./pages/field-factory/field-factory.page').then(m => m.FieldFactoryPage) },
  { path: 'field-validations', loadComponent: () => import('./pages/field-validations/field-validations.page').then(m => m.FieldValidationsPage) }
];
