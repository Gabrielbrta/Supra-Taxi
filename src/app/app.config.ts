import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { APP_DATE_FORMATS } from './core/config/date-formats';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';

registerLocaleData(localePt)

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
      {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-BR',
    },

    provideMomentDateAdapter(APP_DATE_FORMATS),
  ]
};
