import { Component } from '@angular/core';
import { FormularioTransportistaComponent } from '../formulario-transportista/formulario-transportista.component';
import { CreacionRegistroComponent } from '../../componentes/creacion-registro/creacion-registro.component';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-crear-transportista',
  standalone: true,
  imports: [CreacionRegistroComponent,HeaderComponent],
  templateUrl: './crear-transportista.component.html',
  styles: ``
})
export class CrearTransportistaComponent {
  formularioTransportistas = FormularioTransportistaComponent;
}
