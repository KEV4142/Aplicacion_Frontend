import { Component } from '@angular/core';
import { ListadoGeneralComponent } from '../../componentes/listado-general/listado-general.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-listado-sucursal',
  imports: [ListadoGeneralComponent,HeaderComponent],
  templateUrl: './listado-sucursal.component.html',
  styles: ``
})
export class ListadoSucursalComponent {
  columnas = ['sucursalID','descripcion', 'direccion', 'coordenada', 'estado', 'acciones'];
}
