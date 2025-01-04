import { Component, ComponentRef, inject, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CargandoComponent } from '../cargando/cargando.component';
import { MostrarErroresComponent } from '../mostrar-errores/mostrar-errores.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { extraerErrores } from '../../funciones/extraerErrores';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edicion-registro',
  imports: [CargandoComponent,MostrarErroresComponent],
  templateUrl: './edicion-registro.component.html',
  styles: ``
})
export class EdicionRegistroComponent<TDTO, TCreacionDTO> implements OnInit {

  getHeaders(): HttpHeaders{
        const token = this.authService.getToken();
        if (!token) {
          throw new Error('Sin Autorizacion!!');
        }
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      }

  constructor(private authService: AuthService,private http: HttpClient,private router: Router ) {}
  
  ngOnInit(): void {
    const headers = this.getHeaders();
    this.http.get(environment.apiUrl+this.rutaListado+'/'+this.id, { headers }).subscribe(entidad => {
      this.cargarComponente(entidad);
    })
  }

  cargarComponente(entidad: any){
    if (this.contenedorFormulario){
      this.componentRef = this.contenedorFormulario.createComponent(this.formulario);
      this.componentRef.instance.modelo = entidad;
      this.componentRef.instance.posteoFormulario.subscribe((entidad: any) => {
        this.guardarCambios(entidad);
      })

      this.cargando = false;
    }
  }

  @Input()
  id!: number;

  @Input({required: true})
  titulo!: string;

  @Input({required: true})
  rutaListado!: string;

  @Input({required: true})
  formulario: any;

  errores: string[] = [];

  cargando = true;
  
  @ViewChild('contenedorFormulario', {read: ViewContainerRef})
  contenedorFormulario!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;

  guardarCambios(entidad: TCreacionDTO) {
    const headers = this.getHeaders();
    this.http.put<TDTO>(environment.apiUrl+this.rutaListado+'/'+this.id , entidad, { headers }).subscribe({
          next: (response) => {
        this.router.navigate(['/'+this.rutaListado]);
      },
      error: err => {
        const errores = extraerErrores(err);
        this.errores = errores;
      }
    });
  }
}
