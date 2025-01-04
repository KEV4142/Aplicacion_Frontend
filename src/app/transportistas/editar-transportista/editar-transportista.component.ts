import { Component, Input, numberAttribute } from '@angular/core';
import { FormularioTransportistaComponent } from '../formulario-transportista/formulario-transportista.component';
import { EdicionRegistroComponent } from '../../componentes/edicion-registro/edicion-registro.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-editar-transportista',
  standalone: true,
  imports: [EdicionRegistroComponent,HeaderComponent],
  templateUrl: './editar-transportista.component.html',
  styles: ``
})
export class EditarTransportistaComponent {
  @Input({transform: numberAttribute})
  id!: number;
  formularioTransportistas = FormularioTransportistaComponent;
}
