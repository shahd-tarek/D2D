import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
        provideZonelessChangeDetection(),

    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor, loadingInterceptor])),
    provideRouter(routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      })
    )
  ]
};


