import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFormlyCore } from '@ngx-formly/core';
import { withFormlyBootstrap } from '@ngx-formly/bootstrap';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import css from 'highlight.js/lib/languages/css';
import { GlobalErrorHandler } from './core/errors/global-error-handler';

// Registro de los lenguajes que se van a resaltar con Highlight.js
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('css', css);


export const appConfig: ApplicationConfig = {
  providers: [
    // === Core Angular ===
    provideBrowserGlobalErrorListeners(),
    // provideZonelessChangeDetection(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    // === Error Handler ===
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },

    // === Routing & HTTP ===
    provideRouter(routes),
    provideHttpClient(),

    // === Forms ===
    provideFormlyCore([
      ...withFormlyBootstrap(),
    ]),
  ]
};
