import { Component } from '@angular/core';
import { CreacionRegistroComponent } from '../../componentes/creacion-registro/creacion-registro.component';
import { HeaderComponent } from '../../header/header.component';
import { FormularioSucursalComponent } from '../formulario-sucursal/formulario-sucursal.component';

@Component({
  selector: 'app-crear-sucursal',
  standalone: true,
  imports: [CreacionRegistroComponent,HeaderComponent],
  templateUrl: './crear-sucursal.component.html',
  styles: ``
})
export class CrearSucursalComponent {
  formulariosucursales = FormularioSucursalComponent;
}
