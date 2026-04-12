import { APP_INITIALIZER, ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFormlyConfig, provideFormlyCore } from '@ngx-formly/core';
import { withFormlyBootstrap } from '@ngx-formly/bootstrap';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import css from 'highlight.js/lib/languages/css';
import { GlobalErrorHandler } from './core/errors/global-error-handler';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { timeoutInterceptor } from './core/interceptors/timeout.interceptor';
import { AuthService } from './core/services/auth.service';
import { lastValueFrom } from 'rxjs';
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor';
import { SwitchFieldType } from './shared/components/formly/switch.type';
import { NbTypeaheadFieldType } from './shared/components/formly/nb-typeahead.type';
import { FloatingLabelWrapper } from './shared/components/formly/floating-label.wrapper';
import { RowWrapper } from './shared/components/formly/row.wrapper';

// Registro de los lenguajes que se van a resaltar con Highlight.js
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('css', css);

function initializeAuth(authService: AuthService) {
  return () => lastValueFrom(authService.checkAuthStatus());
}

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

    {
      provide: APP_INITIALIZER,
      useFactory: initializeAuth,
      deps: [AuthService],
      multi: true
    },

    // === Routing & HTTP ===
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        credentialsInterceptor,
        timeoutInterceptor, 
        errorInterceptor
    ])
    ),

    // === Forms ===
    provideFormlyCore([
      ...withFormlyBootstrap(),
    ]),
    provideFormlyConfig({
      // Mensajes de error predefinidos
      validationMessages: [
        { name: 'required', message: 'Este campo es obligatorio' },
        { name: 'minlength', message: (error) => `Mínimo ${error.requiredLength} caracteres` },
        { name: 'maxlength', message: (error) => `Máximo ${error.requiredLength} caracteres` },
        { name: 'pattern', message: 'Formato no válido' },
        { name: 'email', message: 'Email no válido' },
      ],
      wrappers: [
        { name: 'floating-label', component: FloatingLabelWrapper },
        //{ name: 'row', component: RowWrapper },
      ],
      types: [
        // {
        //   name: 'input-floating',
        //   extends: 'input',
        //   defaultOptions: {
        //     wrappers: ['form-field'],
        //     props: {
        //       floatingLabel: true,
        //     },
        //   },
        // },
        { name: 'switch', component: SwitchFieldType },
        { name: 'nb-typeahead', component: NbTypeaheadFieldType },
      ],
      extras: {
        showError: (field) => !!(field.formControl?.invalid && field.formControl?.touched),
      },
    }),
  ]
};
