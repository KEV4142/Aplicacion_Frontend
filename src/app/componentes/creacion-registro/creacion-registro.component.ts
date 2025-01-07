import { AfterViewInit, Component, ComponentRef, inject, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { MostrarErroresComponent } from '../mostrar-errores/mostrar-errores.component';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { extraerErroresFormulario } from '../../funciones/extraerErrores';
import { HeaderService } from '../../header.service';

@Component({
  selector: 'app-creacion-registro',
  imports: [MostrarErroresComponent],
  templateUrl: './creacion-registro.component.html',
  styles: ``
})
export class CreacionRegistroComponent<TDTO, TCreacionDTO> implements AfterViewInit{
  private componentRef!: ComponentRef<any>;
  
  constructor(private headerService: HeaderService,private http: HttpClient,private router: Router ) {}
  
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
  
  errores: string = '';
  
  @ViewChild('contenedorFormulario', {read: ViewContainerRef})
  contenedorFormulario!: ViewContainerRef;


  guardarCambios(entidad: TCreacionDTO) {
    const headers = this.headerService.getHeaders();
    this.http.post<TDTO>(environment.apiUrl+this.rutaListado+'/registro' , entidad, { headers }).subscribe({
          next: (response) => {
        this.router.navigate(['/'+this.rutaListado]);
      },
      error: err => {
        const errores = extraerErroresFormulario(err);
        this.errores = errores;
        setTimeout(() => {
          this.errores = '';
        }, 5000);
      }
    });
  }

}
