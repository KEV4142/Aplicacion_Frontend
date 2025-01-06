import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ListadoGeneralComponent } from '../../componentes/listado-general/listado-general.component';

@Component({
  selector: 'app-listado-sucursal-colaborador',
  imports: [ListadoGeneralComponent,HeaderComponent],
  templateUrl: './listado-sucursal-colaborador.component.html',
  styles: ``
})
export class ListadoSucursalColaboradorComponent {
  columnas = ['sucursalID','descripcion', 'colaboradorID', 'nombre','distancia', 'estado'];
}
