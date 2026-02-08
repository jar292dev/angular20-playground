import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '',
        children: [
            { path: '', loadComponent: () => import('./features/home/home').then(m => m.Home) },
            { path: 'not-found', loadComponent: () => import('./features/not-found/not-found').then(m => m.NotFound) },
            { path: 'angular', loadChildren: () => import('./features/angular/angular.routes').then(m => m.angularRoutes) },
            { path: 'formly', loadChildren: () => import('./features/tools/formly/formly.routes').then(m => m.formlyRoutes) },
            { path: 'zod', loadChildren: () => import('./features/tools/zod/zod.routes').then(m => m.zodRoutes) },

            { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
        ]
    }    
];
