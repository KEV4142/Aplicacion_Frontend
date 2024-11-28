import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import {HeaderComponent} from '../header/header.component'

interface Transportista {
  transportistaID: number;
  descripcion: string;
  tarifa: number;
  estado: string;
}
interface Sucursal {
  sucursalID: number;
  descripcion: string;
  direccion: string;
  coordenada: string;
  estado: string;
}
interface Colaboradores {
  sucursalID: number;
  descripcion: string;
  colaboradorID: number;
  nombre: string;
  distancia: number;
  estado: string;
}
interface ViajeResponse {
  isSuccess: boolean;
  value: number;
  error: string | null;
}


@Component({
  selector: 'app-viajes',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,HeaderComponent],
  templateUrl: './viajes.component.html',
  styleUrl: './viajes.component.css'
})

export class ViajesComponent implements OnInit {
  viaje = {
    fecha: '',
    transportistaID: -1,
    sucursalID: -1,
    viajesdetalle: []
  };
  
  transportistas: Transportista[] = [];
  sucursales: Sucursal[] = [];
  colaboradores: Colaboradores[] = [];
  selectedColaboradores: Colaboradores[] = [];
  sumaDistancias: number = 0;
  mensaje: string = '';

  constructor(private authService: AuthService,private http: HttpClient,private router: Router ) {}

  ngOnInit() {
    this.loadTransportistas();
    this.loadSucursales();
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


  loadSucursales() {
    const headers = this.getHeaders();
      this.http.get<Sucursal[]>(`${environment.apiUrl}sucursales/activos`, { headers }).subscribe((data: Sucursal[]) => {
        this.sucursales = data;
      });
  }


  loadColaboradores(sucursalID: number) {
    if (sucursalID) {
      const headers = this.getHeaders();
      this.http.get<Colaboradores[]>(`${environment.apiUrl}sucursalescolaboradores/activos/${sucursalID}`, { headers }).subscribe((data: Colaboradores[]) => {
        this.colaboradores = data;
      });
    }
  }

  selectColaborador(colaborador: Colaboradores) {
    if (!this.selectedColaboradores.includes(colaborador)) {
      this.selectedColaboradores.push(colaborador);
    }
  } 

  addColaborador(colaborador: Colaboradores) {
    if (!this.selectedColaboradores.includes(colaborador)) {
      this.selectedColaboradores.push(colaborador);
      this.sumaDistancias += colaborador.distancia;
      this.colaboradores = this.colaboradores.filter(item => item !== colaborador);
    }
  }

  removeColaborador(colaborador: Colaboradores) {
    this.selectedColaboradores = this.selectedColaboradores.filter(item => item !== colaborador);
    this.sumaDistancias -= colaborador.distancia;
    this.colaboradores.push(colaborador);
  }

  isFormValid() {
    return this.viaje.fecha && this.viaje.transportistaID && this.viaje.sucursalID && this.selectedColaboradores.length > 0 && this.sumaDistancias<100;
  }


  registrarViaje() {
    const headers = this.getHeaders();
    const viajeData = {
      fecha: this.viaje.fecha,
      sucursalid: this.viaje.sucursalID,
      transportistaid: this.viaje.transportistaID,
      viajesdetalle: this.selectedColaboradores.map(colaborador => ({
         colaboradorid: colaborador.colaboradorID
      }))
    };
    this.http.post<ViajeResponse>(environment.apiUrl+'viaje/registro' , viajeData, { headers }).subscribe({
      next: (response) => {
        this.mensaje = `Viaje No. ${response.value} registrado exitosamente!`;
        setTimeout(() => {
          this.mensaje = '';
          this.selectedColaboradores = []; 
          this.viaje = { fecha: '', transportistaID: -1, sucursalID: -1, viajesdetalle: [] };
          this.router.navigate(['/dashboard']);
        }, 5000);
      },
      error: (erro) => {
        this.mensaje = 'Error al registrar viaje. '+erro.error.error;
        setTimeout(() => {
          this.mensaje = '';
        }, 5000);
      }
    });
  }
}
