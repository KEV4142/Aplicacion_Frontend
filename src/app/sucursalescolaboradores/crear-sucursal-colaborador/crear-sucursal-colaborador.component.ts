import { Component } from '@angular/core';
import { CreacionRegistroComponent } from '../../componentes/creacion-registro/creacion-registro.component';
import { HeaderComponent } from '../../header/header.component';
import { FormularioSucursalColaboradorComponent } from '../formulario-sucursal-colaborador/formulario-sucursal-colaborador.component';

@Component({
  selector: 'app-crear-sucursal-colaborador',
  imports: [CreacionRegistroComponent,HeaderComponent],
  templateUrl: './crear-sucursal-colaborador.component.html',
  styles: ``
})
export class CrearSucursalColaboradorComponent {
  formularioSucursalColaborador = FormularioSucursalColaboradorComponent;
}
