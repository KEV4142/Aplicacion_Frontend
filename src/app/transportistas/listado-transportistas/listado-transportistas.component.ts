import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { ListadoGeneralComponent } from '../../componentes/listado-general/listado-general.component';

@Component({
  selector: 'app-listado-transportistas',
  imports: [ListadoGeneralComponent,HeaderComponent],
  templateUrl: './listado-transportistas.component.html',
  styles: ``
})
export class ListadoTransportistasComponent {
  columnas = ['transportistaID','descripcion', 'tarifa', 'estado', 'acciones'];
}
