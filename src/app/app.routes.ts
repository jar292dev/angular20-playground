import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '',
        children: [
            { path: '', loadComponent: () => import('./core/pages/home/home').then(m => m.Home) },
            { path: 'not-found', loadComponent: () => import('./core/pages/not-found/not-found').then(m => m.NotFound) },
            { path: 'forbidden', loadComponent: () => import('./core/pages/forbidden/forbidden').then(m => m.Forbidden) },

            // === Secciones principales ===
            { path: 'angular', loadChildren: () => import('./features/angular/angular.routes').then(m => m.angularRoutes) },
            { path: 'formly', loadChildren: () => import('./features/tools/formly/formly.routes').then(m => m.formlyRoutes) },
            { path: 'zod', loadChildren: () => import('./features/tools/zod/zod.routes').then(m => m.zodRoutes) },
            { path: 'ng-bootstrap', loadChildren: () => import('./features/ng-bootstrap/ng-bootstrap.routes').then(m => m.ngBootstrapRoutes) },
            { path: 'experimental', loadChildren: () => import('./features/experimental/experimental.routes').then(m => m.experimentalRoutes) },

            // === Ruta comodín para páginas no encontradas ===
            { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
        ]
    }    
];
