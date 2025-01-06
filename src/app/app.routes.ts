import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViajesComponent } from './viajes/viajes.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ListadoTransportistasComponent } from './transportistas/listado-transportistas/listado-transportistas.component'
import { CrearTransportistaComponent } from './transportistas/crear-transportista/crear-transportista.component';
import { EditarTransportistaComponent } from './transportistas/editar-transportista/editar-transportista.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { CrearSucursalComponent } from './sucursales/crear-sucursal/crear-sucursal.component';
import { EditarSucursalComponent } from './sucursales/editar-sucursal/editar-sucursal.component';
import { ListadoSucursalComponent } from './sucursales/listado-sucursal/listado-sucursal.component';
import { CrearSucursalColaboradorComponent } from './sucursalescolaboradores/crear-sucursal-colaborador/crear-sucursal-colaborador.component';
import { ListadoSucursalColaboradorComponent } from './sucursalescolaboradores/listado-sucursal-colaborador/listado-sucursal-colaborador.component';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'viajes', component: ViajesComponent, canActivate: [AuthGuard] },
  { path: 'sucursalescolaboradores', component: ListadoSucursalColaboradorComponent, canActivate: [AuthGuard] },
  { path: 'sucursalescolaboradores/crear', component: CrearSucursalColaboradorComponent, canActivate: [AuthGuard] },
  { path: 'reporte', component: ReporteComponent, canActivate: [AuthGuard] },
  { path: 'transportistas', component: ListadoTransportistasComponent, canActivate: [AuthGuard] },
  { path: 'transportistas/crear', component: CrearTransportistaComponent, canActivate: [AuthGuard] },
  { path: 'transportistas/editar/:id', component: EditarTransportistaComponent, canActivate: [AuthGuard] },
  { path: 'sucursales', component: ListadoSucursalComponent, canActivate: [AuthGuard] },
  { path: 'sucursales/crear', component: CrearSucursalComponent, canActivate: [AuthGuard] },
  { path: 'sucursales/editar/:id', component: EditarSucursalComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];
