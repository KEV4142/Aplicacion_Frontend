import { CommonModule } from '@angular/common';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { AuthGuard } from './auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes, withComponentInputBinding()),
    AuthGuard,
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom([SweetAlert2Module.forRoot()])
  ],
  imports: [CommonModule,
    ReactiveFormsModule], 
};
