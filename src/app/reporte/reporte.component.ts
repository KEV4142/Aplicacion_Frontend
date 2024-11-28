import { Component , OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import {HeaderComponent} from '../header/header.component'

interface Transportista {
  transportistaID: number;
  descripcion: string;
  tarifa: number;
  estado: string;
}


@Component({
  selector: 'app-reporte',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,HeaderComponent],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css'
})
export class ReporteComponent  implements OnInit{
  transportistas: Transportista[] = [];
  reporte = {
    transportistaID: -1,
    fechaInicio: '',
    fechaFinal: ''
  };

  constructor(private authService: AuthService,private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadTransportistas();
  }

  getHeaders(): HttpHeaders{
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('Sin Autorizacion!!');
    }
    
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  loadTransportistas() {
    const headers = this.getHeaders();
    this.http.get<Transportista[]>(environment.apiUrl+'transportistas/activos', { headers }).subscribe((data: Transportista[]) => {
      this.transportistas = data;
    });
  }

  isFormValid() {
    return (this.reporte.fechaInicio < this.reporte.fechaFinal) && this.reporte.fechaInicio && this.reporte.fechaFinal && this.reporte.transportistaID !== -1;
  }

  generarReporte() {
    const headers = this.getHeaders();

    const reporteData = {
      TransportistaID: this.reporte.transportistaID,
      FechaInicio: this.reporte.fechaInicio,
      FechaFinal: this.reporte.fechaFinal
    };

    this.http.post(`${environment.apiUrl}reporte`, reporteData, { headers, responseType: 'blob' }).subscribe({
      next: (response) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'reporte_transportistas.pdf';
        link.click();
      },
      error:(error) => {
        console.error('Error al generar el reporte', error);
      }
    });
  }

}
