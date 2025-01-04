import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViajesComponent } from './viajes/viajes.component';
import { ColaboradoresSucursalesComponent } from './colaboradores-sucursales/colaboradores-sucursales.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ListadoTransportistasComponent } from './transportistas/listado-transportistas/listado-transportistas.component'
import { CrearTransportistaComponent } from './transportistas/crear-transportista/crear-transportista.component';
import { EditarTransportistaComponent } from './transportistas/editar-transportista/editar-transportista.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'viajes', component: ViajesComponent, canActivate: [AuthGuard] },
  { path: 'colaboradores', component: ColaboradoresSucursalesComponent, canActivate: [AuthGuard] },
  { path: 'reporte', component: ReporteComponent, canActivate: [AuthGuard] },
  { path: 'transportistas', component: ListadoTransportistasComponent, canActivate: [AuthGuard] },
  { path: 'transportistas/crear', component: CrearTransportistaComponent, canActivate: [AuthGuard] },
  { path: 'transportistas/editar/:id', component: EditarTransportistaComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];
