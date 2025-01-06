import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Colaboradores, Sucursal, SucursalesColaboradoresCreacionDTO, SucursalesColaboradoresDTO } from '../sucursales-colaboradores';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Opcion {
  name: string;
  abr: string;
}

@Component({
  selector: 'app-formulario-sucursal-colaborador',
  standalone: true,
  imports: [CommonModule,MatSelectModule,MatOptionModule,RouterLink, MatButtonModule,MatFormFieldModule,ReactiveFormsModule,MatInputModule],
  templateUrl: './formulario-sucursal-colaborador.component.html',
  styles: ``
})
export class FormularioSucursalColaboradorComponent implements OnInit{
  private formBuilder = inject(FormBuilder);
  sucursales: Sucursal[] = [];
  colaboradores: Colaboradores[] = [];
  
  opciones: Opcion[] = [
    {name: 'Activo', abr: 'A'},
    {name: 'Bloqueado', abr: 'B'},
    {name: 'Inactivo', abr: 'I'},
  ];
  ngOnInit(): void {
    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
    this.loadSucursales();
    this.loadColaboradores();
  }
  getHeaders(): HttpHeaders{
      const token = this.authService.getToken();
      if (!token) {
        throw new Error('Sin Autorizacion!!');
      }
      
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    constructor(private authService: AuthService,private http: HttpClient,private router: Router ) {}
    
  @Input()
    modelo?: SucursalesColaboradoresDTO;
    @Output()
    posteoFormulario = new EventEmitter<SucursalesColaboradoresCreacionDTO>();
  
    form = this.formBuilder.group({
      sucursalid: new FormControl<number | null>( null, {
        validators: [Validators.required, Validators.min(1)]
      }),
      colaboradorid: new FormControl<number | null>( null, {
        validators: [Validators.required, Validators.min(1)]
      }),
      distancia: new FormControl<number | null>( null, {
        validators: [Validators.required, Validators.min(1)]
      }),
      estado: ['', {
        validators: [Validators.required]
      }]
    })
  
  sel: string='';

  obtenerErrorCampoSucursalID(){
    let campo = this.form.controls.sucursalid;

    if (campo.hasError('required')){
      return 'El campo Sucursal es requerido';
    }
    if (campo.hasError('min')){
      return 'El campo Sucursal debe estar seleccionado.';
    }
    return "";
  }

  obtenerErrorCampoColaboradorID(){
    let campo = this.form.controls.colaboradorid;
    if (campo.hasError('required')){
      return 'El campo Colaborador es requerido';
    }
    if (campo.hasError('min')){
      return 'El campo Colaborador debe estar seleccionado.';
    }
    return "";
  }

  obtenerErrorCampoDistancia(){
    let campo = this.form.controls.distancia;
    if (campo.hasError('required')){
      return 'El campo Distancia es requerido';
    }
    if (campo.hasError('min')){
      return 'El campo Distancia debe ser mayor a 0.';
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

  loadSucursales() {
      const headers = this.getHeaders();
        this.http.get<Sucursal[]>(`${environment.apiUrl}sucursales/activos`, { headers }).subscribe((data: Sucursal[]) => {
          this.sucursales = data;
        });
    }
  loadColaboradores() {
      const headers = this.getHeaders();
        this.http.get<Colaboradores[]>(`${environment.apiUrl}colaboradores/activos`, { headers }).subscribe((data: Colaboradores[]) => {
          this.colaboradores = data;
        });
    }
    cambioProper(text: string): string {
      if (!text) return '';
      return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
  guardarCambios(){
      if (!this.form.valid){
        return;
      }
      const sucursalColaborador = this.form.value as SucursalesColaboradoresDTO;
      this.posteoFormulario.emit(sucursalColaborador);
    }
}
