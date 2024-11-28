import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViajesComponent } from './viajes/viajes.component';
import { ColaboradoresSucursalesComponent } from './colaboradores-sucursales/colaboradores-sucursales.component';
import { ReporteComponent } from './reporte/reporte.component';
import { AuthGuard } from './auth.guard';
/* export const routes: Routes = [];

 */


// Configuración de rutas
export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'viajes', component: ViajesComponent, canActivate: [AuthGuard] },
  { path: 'colaboradores', component: ColaboradoresSucursalesComponent, canActivate: [AuthGuard] },
  { path: 'reporte', component: ReporteComponent, canActivate: [AuthGuard] },
];
