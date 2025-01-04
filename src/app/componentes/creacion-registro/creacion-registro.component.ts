import { AfterViewInit, Component, ComponentRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MostrarErroresComponent } from '../mostrar-errores/mostrar-errores.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { extraerErrores } from '../../funciones/extraerErrores';

@Component({
  selector: 'app-creacion-registro',
  imports: [MostrarErroresComponent],
  templateUrl: './creacion-registro.component.html',
  styles: ``
})
export class CreacionRegistroComponent<TDTO, TCreacionDTO> implements AfterViewInit{
  private componentRef!: ComponentRef<any>;
  
  constructor(private authService: AuthService,private http: HttpClient,private router: Router ) {}
  
  ngAfterViewInit(): void {
    this.componentRef = this.contenedorFormulario.createComponent(this.formulario);
    this.componentRef.instance.posteoFormulario.subscribe((entidad: any) => {
      this.guardarCambios(entidad);
    })
  }

  @Input({required: true})
  titulo!: string;

  @Input({required: true})
  rutaListado!: string;

  @Input({required: true})
  formulario: any;
  
  errores: string[] = [];

  // private router = inject(Router);
  
  @ViewChild('contenedorFormulario', {read: ViewContainerRef})
  contenedorFormulario!: ViewContainerRef;

  getHeaders(): HttpHeaders{
      const token = this.authService.getToken();
      if (!token) {
        throw new Error('Sin Autorizacion!!');
      }
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }


  guardarCambios(entidad: TCreacionDTO) {
    const headers = this.getHeaders();
    this.http.post<TDTO>(environment.apiUrl+this.rutaListado+'/registro' , entidad, { headers }).subscribe({
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
