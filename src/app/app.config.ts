import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViajesComponent } from './viajes/viajes.component';
import { ColaboradoresSucursalesComponent } from './colaboradores-sucursales/colaboradores-sucursales.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ReactiveFormsModule } from '@angular/forms';

export const appConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(appRoutes),
    AuthGuard,
  ],
  imports: [CommonModule,
    ReactiveFormsModule,], 
};
