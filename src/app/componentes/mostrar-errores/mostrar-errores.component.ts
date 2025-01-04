import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mostrar-errores',
  imports: [],
  templateUrl: './mostrar-errores.component.html',
  styles: ``
})
export class MostrarErroresComponent {
  @Input({required: true})
  errores!: string[];
}
