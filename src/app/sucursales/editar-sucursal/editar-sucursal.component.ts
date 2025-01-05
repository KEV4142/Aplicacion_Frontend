import { Component, Input, numberAttribute } from '@angular/core';
import { EdicionRegistroComponent } from '../../componentes/edicion-registro/edicion-registro.component';
import { HeaderComponent } from '../../header/header.component';
import { FormularioSucursalComponent } from '../formulario-sucursal/formulario-sucursal.component';

@Component({
  selector: 'app-editar-sucursal',
  standalone: true,
  imports: [EdicionRegistroComponent,HeaderComponent],
  templateUrl: './editar-sucursal.component.html',
  styles: ``
})
export class EditarSucursalComponent {
  @Input({transform: numberAttribute})
    id!: number;
    formularioSucursales = FormularioSucursalComponent;
}
