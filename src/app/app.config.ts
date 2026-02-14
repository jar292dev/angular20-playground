import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, provideZonelessChangeDetection } from '@angular/core';
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

    // === Routing & HTTP ===
    provideRouter(routes),
    provideHttpClient(),

    // === Forms ===
    provideFormlyCore([
      ...withFormlyBootstrap(),
    ]),
  ]
};
