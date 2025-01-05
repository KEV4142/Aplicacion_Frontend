import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { TransportistaCreacionDTO, TransportistaDTO } from '../transportista';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

interface Opcion {
  name: string;
  abr: string;
}

@Component({
  selector: 'app-formulario-transportista',
  standalone: true,
  imports: [CommonModule,MatSelectModule,MatOptionModule, MatButtonModule,RouterLink,MatFormFieldModule,ReactiveFormsModule,MatInputModule],
  templateUrl: './formulario-transportista.component.html',
  styles: ``
})
export class FormularioTransportistaComponent implements OnInit{
  private formBuilder = inject(FormBuilder);

  opciones: Opcion[] = [
    {name: 'Activo', abr: 'A'},
    {name: 'Bloqueado', abr: 'B'},
    {name: 'Inactivo', abr: 'I'},
  ];
  ngOnInit(): void {
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }
  @Input()
  modelo?: TransportistaDTO;
  @Output()
  posteoFormulario = new EventEmitter<TransportistaCreacionDTO>();

  form = this.formBuilder.group({
    descripcion: ['', {
      validators: [Validators.required]
    }],
    tarifa: new FormControl<number | null>( null, {
      validators: [Validators.required, Validators.min(1)]
    }),
    estado: ['', {
      validators: [Validators.required]
    }]
  })

sel: string='';

  obtenerErrorCampoDescripcion(){
    let campo = this.form.controls.descripcion;
    if (campo.hasError('required')){
      return 'El campo Descripcion es requerido';
    }
    return "";
  }

  obtenerErrorCampoTarifa(){
    let campo = this.form.controls.tarifa;

    if (campo.hasError('required')){
      return 'El campo Tarifa es requerido';
    }
    if (campo.hasError('min')){
      return 'El campo Tarifa debe ser mayor a 0.';
    }

    return "";
  }

  obtenerErrorCampoEstado() {
    const campo = this.form.controls.estado;
    if (campo.hasError('required')) {
      return 'El campo Estado es obligatorio.';
    }
    return '';
  }

  guardarCambios(){
    if (!this.form.valid){
      return;
    }
    const transportista = this.form.value as TransportistaCreacionDTO;
    this.posteoFormulario.emit(transportista);
  }

}
