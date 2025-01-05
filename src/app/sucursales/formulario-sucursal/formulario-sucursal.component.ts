import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { SucursalCreacionDTO, SucursalDTO } from '../sucursal';

interface Opcion {
  name: string;
  abr: string;
}

@Component({
  selector: 'app-formulario-sucursal',
  standalone: true,
  imports: [CommonModule,MatSelectModule,MatOptionModule, MatButtonModule,RouterLink,MatFormFieldModule,ReactiveFormsModule,MatInputModule],
  templateUrl: './formulario-sucursal.component.html',
  styles: ``
})
export class FormularioSucursalComponent implements OnInit{
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
    modelo?: SucursalDTO;
    @Output()
    posteoFormulario = new EventEmitter<SucursalCreacionDTO>();

    form = this.formBuilder.group({
        descripcion: ['', {
          validators: [Validators.required]
        }],
        direccion: ['', {
          validators: [Validators.required]
        }],
        coordenada: ['', {
          validators: [Validators.required]
        }],
        estado: ['', {
          validators: [Validators.required]
        }]
      })
    
    sel: string='';

    obtenerErrorCampoDescripcion(){
      let campo = this.form.controls.descripcion;
      if (campo.hasError('required')){
        return 'El campo Descripcion es requerido.';
      }
      return "";
    }
    obtenerErrorCampoDireccion(){
      let campo = this.form.controls.direccion;
      if (campo.hasError('required')){
        return 'El campo Direccion es requerido.';
      }
      return "";
    }
    obtenerErrorCampoCoordenada(){
      let campo = this.form.controls.coordenada;
      if (campo.hasError('required')){
        return 'El campo Coordenada es requerido.';
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
        const sucursal = this.form.value as SucursalCreacionDTO;
        this.posteoFormulario.emit(sucursal);
      }
  
}
